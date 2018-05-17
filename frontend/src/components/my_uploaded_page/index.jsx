import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button } from 'antd';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const MyUploadedPage = props => (
  <article id="my-uploaded-page" style={{ minHeight: 480 }}>
    <div className="alert" role="alert">
      <Divider orientation="left">友情提醒 ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</Divider>
      <h5 className="text-center font-weight-light">
        注册登录后，上传历史自动同步到云端，更换电脑也不怕记录丢失（ 还没注册？
        <Button
          type="primary"
          onClick={() => props.push('/user/signup')}
        >
          戳我注册
        </Button>
        已有账号？<Button onClick={() => props.push('/user/login')}> 立即登录 </Button> ）
      </h5>
      <Divider orientation="right">友情提醒 ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</Divider>
    </div>
  </article>
);

MyUploadedPage.propTypes = {
  push: PropTypes.func.isRequired,
};

export default connect(null, { push })(MyUploadedPage);
