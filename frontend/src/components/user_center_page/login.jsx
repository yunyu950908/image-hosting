import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Checkbox } from 'antd';

import { fetchUserLogin, clearValidateState } from '../../redux/actions';
import { REMEMBER_ME } from '../../redux/constants';

const { Item } = Form;

class Login extends Component {
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
      }),
      userInput: PropTypes.shape({
        email: PropTypes.string.isRequired,
        pwd: PropTypes.string.isRequired,
      }),
    }),
    fetchUserLogin: PropTypes.func.isRequired,
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

  render() {
    return (
      <section id="login">
        <Item>
          <div className="d-flex justify-content-between">
            <Checkbox
              checked={this.state[REMEMBER_ME]}
              onChange={() => this.setState({ [REMEMBER_ME]: !this.state[REMEMBER_ME] })}
            >
              记住我的登录状态
            </Checkbox>
            <Link href="/user/forget" to="/user/forget">忘记密码？</Link>
          </div>
        </Item>
        <Item>
          <div className="d-flex flex-column">
            <Button
              type="primary"
              style={{ marginBottom: 24 }}
              onClick={() => this.props.fetchUserLogin(this.props.validateState, this.state[REMEMBER_ME])}
            >
              戳我登录
            </Button>
            <Button onClick={() => this.props.replace('/user/signup')}>马上注册</Button>
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
  fetchUserLogin,
  clearValidateState,
})(Login);
