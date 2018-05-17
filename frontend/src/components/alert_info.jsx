import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Divider, Button } from 'antd';

const AlertInfo = props => (
  <div className="alert" role="alert">
    <Divider orientation="left">友情提醒 ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</Divider>
    {props.userState.email ?
      <h5 className="text-center font-weight-light">
        {props.tips}
      </h5> :
      <h5 className="text-center font-weight-light">
        {props.tips}（ 还没注册？
        <Button
          type="primary"
          onClick={() => props.push('/user/signup')}
        >
          戳我注册
        </Button>
        已有账号？<Button onClick={() => props.push('/user/login')}> 立即登录 </Button> ）
      </h5>
    }
    <Divider orientation="right">友情提醒 ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</Divider>
  </div>
);

AlertInfo.propTypes = {
  push: PropTypes.func.isRequired,
  tips: PropTypes.string.isRequired,
  userState: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { userState } = state;
  return { userState };
};


export default connect(mapStateToProps, { push })(AlertInfo);
