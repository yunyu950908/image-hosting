import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Popover, Icon, AutoComplete } from 'antd';

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
  };

  static defaultProps = {
    validateState: {
      validateInput: {
        email: false,
      },
    },
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
      domains = ['gmail.com', 'hotmail.com', '163.com', 'qq.com', '126.com', 'sina.com'].map(domain => `${value}@${domain}`);
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
      <section id="email-input" style={{ width: 320 }}>
        <Item
          {...EmailInput.itemLayout}
          hasFeedback
          validateStatus={this.props.validateState.validateInput.email ? 'success' : ''}
          label="邮箱地址"
          colon={false}
          required
        >
          <Popover placement="right" content={this.tipsGen()} trigger="focus">
            <AutoComplete
              placeholder="示例: ioly@ioly.top"
              onSearch={e => this.handleSearch(e)}
              onChange={e => this.props.validateEmail(e)}
            >
              {this.autoOptsGen()}
            </AutoComplete>
          </Popover>
        </Item>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { validateState } = state;
  return { validateState };
};

export default connect(mapStateToProps, { validateEmail })(EmailInput);
