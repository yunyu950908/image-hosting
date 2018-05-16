import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Checkbox, message } from 'antd';

import { fetchUserSignup, clearValidateState } from '../../redux/actions';
import { REMEMBER_ME } from '../../redux/constants';

const { Item } = Form;

class Signup extends Component {
  static propTypes = {
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
    // userSignup: PropTypes.func.isRequired,
    fetchUserSignup: PropTypes.func.isRequired,
    clearValidateState: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    // push: PropTypes.func.isRequired,
  };

  static defaultProps = {
    validateState: {
      validateInput: {},
      userInput: {},
    },
  };

  state = {
    [REMEMBER_ME]: true,
  };

  componentDidMount() {
    this.props.clearValidateState();
  }

  fetchUserSignup() {
    if (!this.state[REMEMBER_ME]) return message.error('请同意注册协议后重试！');
    this.props.fetchUserSignup(this.props.validateState, 'signup');
    return null;
  }

  render() {
    return (
      <section id="Signup">
        <Item>
          <div className="d-flex">
            <Checkbox
              checked={this.state[REMEMBER_ME]}
              onChange={() => this.setState({ [REMEMBER_ME]: !this.state[REMEMBER_ME] })}
              style={{ marginRight: 8 }}
            />
            <Link href="/user/signup" to="/user/signup">我已同意《注册协议》</Link>
          </div>
        </Item>
        <Item>
          <div className="d-flex flex-column">
            <Button
              type="primary"
              style={{ marginBottom: 24 }}
              onClick={() => this.fetchUserSignup()}
            >
              戳我注册
            </Button>
            <Button onClick={() => this.props.replace('/user/login')}>返回登录</Button>
          </div>
        </Item>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { validateState } = state;
  return { validateState };
};

export default connect(mapStateToProps, {
  push,
  replace,
  fetchUserSignup,
  clearValidateState,
})(Signup);
