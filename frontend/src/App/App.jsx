import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import './App.css';

import { initLeancloud } from '../utils/leancloud';

import HeaderDOM from '../components/header_dom';
import MainDOM from '../components/main_dom';
import FooterDOM from '../components/footer_dom';

class App extends Component {
  static propTypes = {
    userState: PropTypes.shape({
      email: PropTypes.string,
      hostSetting: PropTypes.shape({}),
    }),
  };

  static defaultProps = {
    userState: {
      email: '',
      hostSetting: {},
    },
  };

  componentDidMount() {
    try {
      const { email, hostSetting } = this.props.userState;
      const { leancloud } = hostSetting;
      const { APP_ID, APP_KEY } = leancloud;
      if (APP_ID && APP_KEY && email) initLeancloud(APP_ID, APP_KEY, email);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <HeaderDOM />
        <Route path="/" component={MainDOM} />
        <FooterDOM />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userState } = state;
  return { userState };
};

export default connect(mapStateToProps, { replace })(App);
