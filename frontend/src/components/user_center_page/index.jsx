import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import {} from 'react-router-redux';


import SignupAndLogin from './signup_login';

const UserCenterPage = (props) => {
  const matchUrl = props.match.url;
  return (
    <section
      id="user-center-page"
      // className="d-flex justify-content-center align-items-center"
    >
      <Route exact path={`${matchUrl}`} component={() => <div>user</div>} />
      <Route path={`${matchUrl}/sign`} component={SignupAndLogin} />
      <Route path={`${matchUrl}/login`} component={SignupAndLogin} />
      <Route path={`${matchUrl}/logout`} component={SignupAndLogin} />
    </section>
  );
};

UserCenterPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserCenterPage);
