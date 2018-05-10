import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, message } from 'antd';

import * as API from '../../request';
import { validateSecurityCode } from '../../redux/actions';

const { Item } = Form;
const { Search } = Input;

class SecurityCodeInput extends Component {
  static propTypes = {
    validateState: PropTypes.shape({
      validateInput: PropTypes.shape({
        email: PropTypes.bool.isRequired,
        securityCode: PropTypes.bool.isRequired,
      }),
      userInput: PropTypes.shape({
        email: PropTypes.string.isRequired,
        securityCode: PropTypes.string.isRequired,
      }),
    }),
    validateSecurityCode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    validateState: {
      validateInput: {
        email: false,
        securityCode: false,
      },
      userInput: {
        email: '',
        securityCode: '',
      },
    },
  };

  static itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  static timer = null;

  state = {
    timeout: 60,
  };

  fetchSecurityCode() {
    // 检查邮件格式
    const validateEmail = this.props.validateState.validateInput.email;
    if (!validateEmail) return message.error('请输入正确的邮件地址');
    // 未重置 timeout 不允许重复点击 todo 暂时只有前端校验
    if (this.state.timeout !== 60) return message.warning('请勿频繁获取邮件验证码');
    // 发请求前先减 1 秒上锁，防止重复点击
    this.setState(prevState => ({ timeout: prevState.timeout - 1 }));
    // 获取用户输入的 email, 发送验证邮件
    const InputEmail = this.props.validateState.userInput.email;
    API.fetchMail({ email: InputEmail })
      .then(({ data }) => {
        message.success('发送成功！请查看您的邮件！');
        // 邮件发送成功，先记录 messageId
        this.props.validateSecurityCode(data.data.messageId, true);
        SecurityCodeInput.timer = window.setInterval(() => {
          if (this.state.timeout < 1) {
            window.clearInterval(SecurityCodeInput.timer);
            return this.setState({ timeout: 60 });
          }
          return this.setState(prevState => ({ timeout: prevState.timeout - 1 }));
        }, 1000);
      })
      .catch((e) => {
        this.setState({ timeout: 60 });
        console.error(e);
        message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      });
    return null;
  }


  render() {
    return (
      <section id="security-code-input" style={{ width: 320 }}>
        <Item
          {...SecurityCodeInput.itemLayout}
          hasFeedback
          validateStatus={this.props.validateState.validateInput.securityCode ? 'success' : 'warning'}
          label="验证码"
          colon={false}
          required
        >
          <Search
            placeholder="邮箱验证码"
            enterButton={this.state.timeout === 60 ? '获取验证码' : `重新获取(${this.state.timeout})`}
            onSearch={() => this.fetchSecurityCode()}
            onChange={e => this.props.validateSecurityCode(e.target.value)}
          />
        </Item>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { validateState } = state;
  return { validateState };
};

export default connect(mapStateToProps, { validateSecurityCode })(SecurityCodeInput);
