import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { connect } from 'react-redux';

import EmailItem from './email_input';
import PwdItem from './pwd_input';
import LoginItem from './login';
import SignupItem from './signup';
import SecurityCodeItem from './security_code_input';

class SignupAndLogin extends Component {
  static confirmPwd = true;

  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { path } = this.props.match;
    return (
      <section id="signup-and-login" style={{ width: 320 }}>
        <Form layout="horizontal">
          <EmailItem />
          {path === '/user/signup' ? <SecurityCodeItem /> : null}
          <PwdItem />
          {path === '/user/signup' ? <PwdItem isConfirm={SignupAndLogin.confirmPwd} /> : null}
          {path === '/user/signup' ? <SignupItem /> : <LoginItem />}
        </Form>
      </section>
    );
  }
}

export default connect(null, {})(SignupAndLogin);