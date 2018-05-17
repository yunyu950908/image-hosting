import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { validateEmail, fetchUserSignup } from '../../redux/actions';
import EmailItem from './email_input';
import SecurityCodeItem from './security_code_input';
import PwdItem from './pwd_input';

const { Item } = Form;

class UserInfo extends Component {
  static propTypes = {
    validateEmail: PropTypes.func.isRequired,
    fetchUserSignup: PropTypes.func.isRequired,
    userState: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    validateState: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    this.props.validateEmail(this.props.userState.email);
  }

  updateClick() {
    this.props.fetchUserSignup(this.props.validateState, 'forget');
  }

  render() {
    return (
      <section id="user-info">
        <article style={{ width: 480 }}>
          <h6>个人信息</h6>
          <hr />
          <EmailItem />
          <Item
            {...UserInfo.itemLayout}
            label="账户类型"
            colon={false}
          >
            <Input defaultValue="社会大佬" disabled />
          </Item>
        </article>
        <article>
          <h6>修改密码</h6>
          <hr />
          <SecurityCodeItem />
          <PwdItem labelName="新密码" />
          <PwdItem labelName="确认密码" />
          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={() => this.updateClick()}> (๑•̀ㅂ•́)و✧ 确认修改 </Button>
          </div>
        </article>
      </section>
    );
  }
}

UserInfo.itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const mapStateToProps = (state) => {
  const { validateState, userState } = state;
  return { validateState, userState };
};


export default connect(mapStateToProps, { validateEmail, fetchUserSignup })(UserInfo);
