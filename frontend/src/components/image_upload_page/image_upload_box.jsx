import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

// CSS
import './image_upload_box.css';

const ImageUploadBox = (props) => {
  // 通过传递事件激活隐藏的 input file 控件
  let hiddenFileInput = null;
  const activeFileInput = () => hiddenFileInput.click();

  return (
    <div
      id="image-upload-content"
      className="d-flex flex-column justify-content-center align-items-center"
      onClick={activeFileInput}
      onKeyPress={() => undefined}
      role="button"
      tabIndex="0"
      style={props.dynamicStyle}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={e => props.handleInput(e)}
        ref={(input) => {
          hiddenFileInput = input;
        }}
        style={{ display: 'none' }}
      />
      <Icon type="inbox" style={{ color: '#40a9ff', fontSize: '64px' }} />
      <p>截图粘贴、拖拽图片、点击上传</p>
      <p>支持单张和多张同时上传，支持格式 jpg / jpeg / png / gif 等类型 </p>
    </div>
  );
};

ImageUploadBox.propTypes = {
  handleInput: PropTypes.func.isRequired,
  dynamicStyle: PropTypes.shape({
    height: PropTypes.string,
  }).isRequired,
};

export default ImageUploadBox;
