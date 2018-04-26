import React from 'react';
import { Upload, Icon, message } from 'antd';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const MainDOM = () => (
  <section id="main">
    <Dragger className="upload-box" {...props}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">截图粘贴、拖拽图片、点击上传</p>
      <p className="ant-upload-hint">支持单张和多张同时上传，支持格式 jpg / jpeg / png / gif </p>
    </Dragger>
  </section>
);

export default MainDOM;