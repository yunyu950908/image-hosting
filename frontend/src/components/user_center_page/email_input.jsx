import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Popover, Icon, AutoComplete, Input } from 'antd';

import { validateEmail } from '../../redux/actions';

const { Item } = Form;
const { Option } = AutoComplete;

class EmailInput extends Component {
  static propTypes = {
    validateState: PropTypes.shape({
      validateInput: PropTypes.shape({
        email: PropTypes.bool.isRequired,
      }),
    }),
    validateEmail: PropTypes.func.isRequired,
    edit: PropTypes.bool,
  };

  static defaultProps = {
    validateState: {
      validateInput: {
        email: false,
      },
    },
    edit: false,
  };

  static itemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  constructor() {
    super();
    this.state = {
      domains: [],
    };
  }

  handleSearch(value) {
    let domains = [];
    if (!value || value.indexOf('@') > -1) {
      domains = [];
    } else {
      domains = ['ioly.top', '163.com', 'qq.com', 'gmail.com', 'hotmail.com', '126.com', 'sina.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({ domains });
  }

  autoOptsGen() {
    const { domains } = this.state;
    return domains.map(email => (
      <Option key={email}>{email}</Option>
    ));
  }

  tipsGen() {
    const { email } = this.props.validateState.validateInput;
    const iconDomGen = curField => (curField ?
      <Icon type="check-circle" style={{ color: '#52C41A', marginRight: 4 }} /> :
      <Icon type="close-circle" style={{ color: '#F5222D', marginRight: 4 }} />);
    return (
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
  }

  render() {
    return (
      <section id="email-input">
        <Item
          hasFeedback
          validateStatus={this.props.validateState.validateInput.email ? 'success' : ''}
          {...EmailInput.itemLayout}
          label="邮箱地址"
          colon={false}
          required={this.props.edit}
        >
          {this.props.edit ?
            <Popover placement="right" content={this.tipsGen()} trigger="focus">
              <AutoComplete
                placeholder="示例: ioly@ioly.top"
                onSearch={e => this.handleSearch(e)}
                onChange={e => this.props.validateEmail(e)}
              >
                {this.autoOptsGen()}
              </AutoComplete>
            </Popover> :
            <Input defaultValue={this.props.userState.email} disabled={true} />
          }
        </Item>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { validateState, userState } = state;
  return { validateState, userState };
};

export default connect(mapStateToProps, { validateEmail })(EmailInput);
