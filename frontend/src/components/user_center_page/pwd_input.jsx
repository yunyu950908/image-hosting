import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Popover, Icon } from 'antd';

import { validatePwd } from '../../redux/actions';

const { Item } = Form;

class PwdInput extends Component {
  static propTypes = {
    validateState: PropTypes.shape({
      validateInput: PropTypes.shape({
        validateInputField: PropTypes.shape({
          hasEnoughChars: PropTypes.bool.isRequired,
          hasNum: PropTypes.bool.isRequired,
          hasLowercase: PropTypes.bool.isRequired,
          hasUppercase: PropTypes.bool.isRequired,
          isSame: PropTypes.bool.isRequired,
        }),
      }),
    }),
    validatePwd: PropTypes.func.isRequired,
    handleEnterPress: PropTypes.func,
    isConfirm: PropTypes.bool,
  };

  static defaultProps = {
    validateState: {
      validateInput: {
        validateInputField: {
          hasEnoughChars: false,
          hasNum: false,
          hasLowercase: false,
          hasUppercase: false,
          isSame: false,
        },
      },
    },
    handleEnterPress: () => {
    },
    isConfirm: false,
  };

  static itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  tipsGen(isConfirm = false) {
    const validateInputField = isConfirm ? 'confirmPwd' : 'pwd';
    const {
      hasEnoughChars,
      hasUppercase,
      hasLowercase,
      hasNum,
      isSame,
    } = this.props.validateState.validateInput[validateInputField];

    const iconDomGen = curField => (curField ?
      <Icon type="check-circle" style={{ color: '#52C41A', marginRight: 4 }} /> :
      <Icon type="close-circle" style={{ color: '#F5222D', marginRight: 4 }} />);

    return (
      <ul
        style={{ margin: 0 }}
        className="d-flex flex-column justify-content-between"
      >
        <li>
          {iconDomGen(hasEnoughChars)}
          密码长度必须是 8 ~ 16 位
        </li>
        <li>
          {iconDomGen(hasUppercase)}
          必须包含一个大写字母
        </li>
        <li>
          {iconDomGen(hasLowercase)}
          必须包含一个小写字母
        </li>
        <li>
          {iconDomGen(hasNum)}
          必须包含一个数字
        </li>
        {isConfirm ? <li>{iconDomGen(isSame)} 必须与密码相同</li> : null}
      </ul>
    );
  }

  render() {
    const validateInputField = this.props.isConfirm ? 'confirmPwd' : 'pwd';
    const isAllTrue = Object.values(this.props.validateState.validateInput[validateInputField]).every(v => v);
    return (
      <section id="pwd-input">
        <Item
          hasFeedback
          validateStatus={isAllTrue ? 'success' : ''}
          {...PwdInput.itemLayout}
          label={this.props.isConfirm ? '确认密码' : '账户密码'}
          colon={false}
          required
        >
          <Popover placement="right" content={this.tipsGen(this.props.isConfirm)} trigger="focus">
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="8~16 位大小写字母与数字组合"
              onChange={e => this.props.validatePwd(e.target.value, this.props.isConfirm)}
              onPressEnter={() => this.props.handleEnterPress()}
            />
          </Popover>
        </Item>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { validateState } = state;
  return { validateState };
};

export default connect(mapStateToProps, { validatePwd })(PwdInput);
