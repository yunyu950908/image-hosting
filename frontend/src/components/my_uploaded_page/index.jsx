import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import AlertInfo from '../alert_info';

const MyUploadedPage = props => (
  <article id="my-uploaded-page" style={{ minHeight: 480 }}>
    {props.userState.email ?
      <AlertInfo tips="该页面正在施工..." /> :
      <AlertInfo tips="注册登录后，上传历史自动同步到云端，更换电脑也不怕记录丢失" />}
  </article>
);

MyUploadedPage.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { userState } = state;
  return { userState };
};

export default connect(mapStateToProps, { push })(MyUploadedPage);
