import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Input, Popover, Icon, AutoComplete, Button, Checkbox, message } from 'antd';

import { verifyEmail, verifyPassword } from '../../utils/verify';
import { fetchSignUp, fetchLogin } from '../../request';
import { userLogin, userSignup } from '../../redux/actions';

const { Item } = Form;
const AutoCompleteOption = AutoComplete.Option;

class SignupAndLogin extends Component {
  static propTypes = {
    replace: PropTypes.func.isRequired,
    userSignup: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {};

  static itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  constructor(props) {
    super(props);
    this.state = {
      domains: [],
      userInput: {
        email: '',
        password: '',
        confirmPwd: '',
      },
      verifyInput: {
        email: false,
        password: {
          hasEnoughChars: false,
          hasNum: false,
          hasLowercase: false,
          hasUppercase: false,
        },
        confirmPwd: false,
        isAgree: true,
      },
    };
  }

  /**
   * fetchUserSignup 注册账号
   * */
  fetchUserSignup() {
    const pwd = this.verifyPwd();
    const { confirmPwd, email, isAgree } = this.state.verifyInput;
    const isPassedValidation = pwd && email && confirmPwd && isAgree;
    if (!isPassedValidation) return message.error('请正确填写邮箱、密码并同意注册协议');
    const userInfo = {
      email: this.state.userInput.email,
      password: this.state.userInput.password,
    };
    fetchSignUp(userInfo)
      .then(({ data }) => {
        const { code, msg } = data;
        if (code !== 0) return message.error(msg);
        // 提交 action
        this.props.userSignup(data.data);
        this.props.replace('/user');
        return message.success('注册成功！');
      })
      .catch((err) => {
        console.error(err);
        message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      });
    return null;
  }

  /**
   * fetchUserLogin 登录
   * */
  fetchUserLogin() {
    const pwd = this.verifyPwd();
    const { email, isAgree } = this.state.verifyInput;
    const isPassedValidation = pwd && email;
    if (!isPassedValidation) return message.error('账号或密码错误！');
    const userInfo = {
      email: this.state.userInput.email,
      password: this.state.userInput.password,
    };
    fetchLogin(userInfo)
      .then(({ data }) => {
        const { code, msg } = data;
        if (code !== 0) return message.error(msg);
        // 提交 action
        this.props.userLogin({ ...data.data, rememberMe: isAgree });
        this.props.replace('/user');
        return message.success('登录成功！');
      })
      .catch((err) => {
        console.error(err);
        message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      });
    return null;
  }

  handleSearch(value) {
    let domains;
    if (!value || value.indexOf('@') > -1) {
      domains = [];
    } else {
      domains = ['gmail.com', 'hotmail.com', '163.com', 'qq.com', '126.com', 'sina.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({ domains });
  }

  /**
   * handleEnterPress 监听键盘事件
   * */
  handleEnterPress() {
    const isSignup = this.props.location.pathname === '/user/sign';
    if (isSignup) return this.fetchUserSignup();
    return this.fetchUserLogin();
  }

  /**
   * changeUserInput 用户输入触发
   * @param value String 当前值
   * @param field String 字段名
   * */
  changeUserInput(value, field) {
    let isValid = null;
    if (field === 'email') {
      isValid = verifyEmail(value);
    } else if (field === 'password') {
      isValid = verifyPassword(value);
    } else if (field === 'confirmPwd') {
      const { password } = this.state.userInput;
      isValid = value === password;
    } else if (field === 'isAgree') {
      isValid = !this.state.verifyInput.isAgree;
    }
    const userInput = {
      ...this.state.userInput,
      [field]: value,
    };
    const verifyInput = {
      ...this.state.verifyInput,
      [field]: isValid,
    };
    this.setState({ userInput, verifyInput });
  }

  /**
   * verifyPwd 密码格式校验
   * */
  verifyPwd() {
    let result = true;
    const { password } = this.state.verifyInput;
    Object.keys(password).forEach((key) => {
      if (!password[key]) result = false;
    });
    return result;
  }

  /**
   * tipsGen 生成 tips
   * @param isConfirm Bool
   * @param isEmail Bool
   * */
  tipsGen(isConfirm = false, isEmail = false) {
    const {
      hasEnoughChars,
      hasUppercase,
      hasLowercase,
      hasNum,
    } = this.state.verifyInput.password;
    const { confirmPwd } = this.state.verifyInput;
    const { email } = this.state.verifyInput;

    const iconDomGen = curField => (curField ?
      <Icon type="check-circle" style={{ color: '#52C41A', marginRight: 4 }} /> :
      <Icon type="close-circle" style={{ color: '#F5222D', marginRight: 4 }} />);

    const pwdTips = (
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
        {isConfirm ? <li>{iconDomGen(confirmPwd)} 必须与注册密码相同</li> : null}
      </ul>
    );

    const emailTips = (
      <ul
        style={{ margin: 0 }}
        className="d-flex flex-column justify-content-between"
      >
        <li>
          {iconDomGen(email)}
          示例：ioly@ioly.top
        </li>
      </ul>
    );

    return isEmail ? emailTips : pwdTips;
  }

  /**
   * autoOptsGen 生成自动补全选项
   * @param domains 邮箱域名列表
   * */
  autoOptsGen() {
    const { domains } = this.state;
    return domains.map(email => (
      <AutoCompleteOption key={email}>{email}</AutoCompleteOption>
    ));
  }

  /**
   * signupDOM 注册独有
   * */
  signupDOM() {
    return (
      <div>
        <Item
          hasFeedback
          validateStatus={this.state.verifyInput.confirmPwd ? 'success' : ''}
          {...SignupAndLogin.itemLayout}
          label="确认密码"
          colon={false}
          required
        >
          <Popover placement="right" content={this.tipsGen(true)} trigger="focus">
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="确认密码"
              onChange={e => this.changeUserInput(e.target.value, 'confirmPwd')}
              onPressEnter={() => this.handleEnterPress()}
            />
          </Popover>
        </Item>
        <Item {...SignupAndLogin.itemLayout}>
          <Checkbox
            checked={this.state.verifyInput.isAgree}
            onChange={() => this.changeUserInput(null, 'isAgree')}
          />
          <a style={{ marginLeft: 8 }} href="/">我已同意《注册协议》</a>
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
      </div>
    );
  }

  /**
   * loginDOM 登录独有
   * */
  loginDOM() {
    return (
      <div>
        <Item>
          <div className="d-flex justify-content-between">
            <Checkbox
              checked={this.state.verifyInput.isAgree}
              onChange={() => this.changeUserInput(null, 'isAgree')}
            >
              记住我的登录状态
            </Checkbox>
            <a href="#forget">忘记密码？</a>
          </div>
        </Item>
        <Item>
          <div className="d-flex flex-column">
            <Button
              type="primary"
              style={{ marginBottom: 24 }}
              onClick={() => this.fetchUserLogin()}
            >
              戳我登录
            </Button>
            <Button onClick={() => this.props.replace('/user/sign')}>马上注册</Button>
          </div>
        </Item>
      </div>
    );
  }

  render() {
    console.log(this.props);

    return (
      <article id="signup" style={{ width: 320 }}>
        <Form
          layout="horizontal"
        >
          <Item
            hasFeedback
            validateStatus={this.state.verifyInput.email ? 'success' : ''}
            {...SignupAndLogin.itemLayout}
            label={this.props.location.pathname === '/user/sign' ? '注册邮箱' : '登录邮箱'}
            colon={false}
            required
          >
            <Popover placement="right" content={this.tipsGen(false, true)} trigger="focus">
              <AutoComplete
                placeholder="示例: ioly@ioly.top"
                onSearch={e => this.handleSearch(e)}
                onChange={e => this.changeUserInput(e, 'email')}
              >
                {this.autoOptsGen()}
              </AutoComplete>
            </Popover>
          </Item>
          <Item
            hasFeedback
            validateStatus={this.verifyPwd() ? 'success' : ''}
            {...SignupAndLogin.itemLayout}
            label={this.props.location.pathname === '/user/sign' ? '注册密码' : '登录密码'}
            colon={false}
            required
          >
            <Popover placement="right" content={this.tipsGen(false)} trigger="focus">
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="8~16 位大小写字母与数字组合"
                onChange={e => this.changeUserInput(e.target.value, 'password')}
                onPressEnter={() => this.handleEnterPress()}
              />
            </Popover>
          </Item>
          {this.props.location.pathname === '/user/sign' ? this.signupDOM() : this.loginDOM()}
        </Form>
      </article>
    );
  }
}

export default connect(null, { replace, userSignup, userLogin })(SignupAndLogin);
