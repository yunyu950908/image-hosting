import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, goBack } from 'react-router-redux';
import { Form, Button } from 'antd';

import { fetchUserSignup } from '../../redux/actions';

import EmailItem from './email_input';
import SecurityCodeItem from './security_code_input';
import PwdItem from './pwd_input';

const Forget = props => (
  <section id="forget" style={{ width: 320 }}>
    <Form>
      <EmailItem />
      <SecurityCodeItem />
      <PwdItem labelName="新密码" />
      <PwdItem labelName="确认密码" />
      <div className="d-flex flex-column">
        <Button
          style={{ marginBottom: 24 }}
          type="primary"
          onClick={() => props.fetchUserSignup(props.validateState, 'forget')}
        >
          戳我确认
        </Button>
        <Button onClick={() => props.goBack(1)}>返回</Button>
      </div>
    </Form>
  </section>
);

Forget.propTypes = {
  goBack: PropTypes.func.isRequired,
  fetchUserSignup: PropTypes.func.isRequired,
  validateState: PropTypes.shape({
    validateInput: PropTypes.shape({
      email: PropTypes.bool.isRequired,
      pwd: PropTypes.shape({
        hasEnoughChars: PropTypes.bool.isRequired,
        hasNum: PropTypes.bool.isRequired,
        hasLowercase: PropTypes.bool.isRequired,
        hasUppercase: PropTypes.bool.isRequired,
      }),
      confirmPwd: PropTypes.shape({
        hasEnoughChars: PropTypes.bool.isRequired,
        hasNum: PropTypes.bool.isRequired,
        hasLowercase: PropTypes.bool.isRequired,
        hasUppercase: PropTypes.bool.isRequired,
        isSame: PropTypes.bool.isRequired,
      }),
    }),
    userInput: PropTypes.shape({
      email: PropTypes.string.isRequired,
      pwd: PropTypes.string.isRequired,
      confirmPwd: PropTypes.string.isRequired,
      securityCode: PropTypes.string.isRequired,
      messageId: PropTypes.string.isRequired,
    }),
  }),
};

Forget.defaultProps = {
  validateState: {
    validateInput: {},
    userInput: {},
  },
};

const mapStateToProps = (state) => {
  const { validateState } = state;
  return { validateState };
};

export default connect(mapStateToProps, { goBack, replace, fetchUserSignup })(Forget);
