import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { Form, Input, Popover, Icon, AutoComplete, Button, Checkbox, message } from 'antd';

import { verifyEmail, verifyPassword } from '../../utils/verify';
import * as API from '../../request';
import { userLogin, userSignup } from '../../redux/actions';

const { Item } = Form;
const { Search } = Input;
const AutoCompleteOption = AutoComplete.Option;

class Forget extends Component {
  render(){
    return (
      <section id="forget">
        forget
        {/*<Item*/}
          {/*labelCol={}*/}
          {/*wrapperCol={}*/}
          {/*label="验证码"*/}
          {/*colon={false}*/}
          {/*required*/}
        {/*>*/}
          {/*<Search*/}
            {/*placeholder="邮箱验证码"*/}
            {/*enterButton={this.state.isSent === 60 ? '获取验证码' : `重新获取(${this.state.isSent})`}*/}
            {/*onSearch={() => this.fetchSecurityCode()}*/}
            {/*onChange={e => this.changeUserInput(e.target.value, 'securityCode')}*/}
          {/*/>*/}
        {/*</Item>*/}
      </section>
    )
  }
}

export default Forget;