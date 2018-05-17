import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, goBack } from 'react-router-redux';
import { Form, Button } from 'antd';

import { fetchUserSignup, clearValidateState } from '../../redux/actions';

import EmailItem from './email_input';
import SecurityCodeItem from './security_code_input';
import PwdItem from './pwd_input';

class Forget extends Component {
  componentDidMount() {
    this.props.clearValidateState();
  }

  render() {
    return (
      <section id="forget" style={{ width: 320 }}>
        <Form>
          <EmailItem edit />
          <SecurityCodeItem />
          <PwdItem labelName="新密码" />
          <PwdItem labelName="确认密码" />
          <div className="d-flex flex-column">
            <Button
              style={{ marginBottom: 24 }}
              type="primary"
              onClick={() => this.props.fetchUserSignup(this.props.validateState, 'forget')}
            >
              戳我确认
            </Button>
            <Button onClick={() => this.props.goBack(1)}>返回</Button>
          </div>
        </Form>
      </section>
    );
  }
}

Forget.propTypes = {
  goBack: PropTypes.func.isRequired,
  fetchUserSignup: PropTypes.func.isRequired,
  clearValidateState: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {
  goBack,
  replace,
  fetchUserSignup,
  clearValidateState,
})(Forget);
