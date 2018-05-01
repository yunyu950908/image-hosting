import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageUploadBox from './image_upload_box';
import ImagePreviewBox from './image_preview_box';

// action types
import { uploadFile } from '../../redux/actions';

// constants
import { LEANCLOUD } from '../../redux/constants';

// todo 选择文件后直接展示预览，提示上传中，成功展示操作按钮，失败展示原因以及重新上传按钮

const ImageUploadPage = (props) => {
  // 处理 input file 上传的文件
  const handleInput = (event) => {
    const { files } = event.target;
    for (let i = 0; i < files.length; i += 1) {
      props.uploadFile(LEANCLOUD, files[i]);
    }
  };

  // JSX
  return (
    <article id="image-upload-page" style={props.uploadState.success.length ? { marginTop: -40 } : {}}>
      <ImageUploadBox
        handleInput={handleInput}
        dynamicStyle={props.uploadState.success.length ? { height: 184 } : {}}
      />
      <ImagePreviewBox imgList={props.uploadState.success} />
    </article>
  );
};

ImageUploadPage.propTypes = {
  uploadState: PropTypes.shape({
    success: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
    failed: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  uploadFile: PropTypes.func.isRequired,
};

ImageUploadPage.defaultProps = {
  uploadState: {
    success: [],
    failed: [],
  },
};

const mapStateToProps = state => ({
  uploadState: state.uploadState,
});

export default connect(mapStateToProps, { uploadFile })(ImageUploadPage);
