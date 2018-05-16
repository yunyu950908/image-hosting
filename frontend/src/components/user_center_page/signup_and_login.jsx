import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { connect } from 'react-redux';

import EmailItem from './email_input';
import PwdItem from './pwd_input';
import LoginItem from './login';
import SignupItem from './signup';
import SecurityCodeItem from './security_code_input';

const SignupAndLogin = (props) => {
  const { path } = props.match;
  return (
    <section id="signup-and-login" style={{ width: 320 }}>
      <Form layout="horizontal">
        <EmailItem edit />
        {path === '/user/signup' ? <SecurityCodeItem /> : null}
        <PwdItem labelName="账户密码" />
        {path === '/user/signup' ? <PwdItem labelName="确认密码" /> : null}
        {path === '/user/signup' ? <SignupItem /> : <LoginItem />}
      </Form>
    </section>
  );
};

SignupAndLogin.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, {})(SignupAndLogin);
