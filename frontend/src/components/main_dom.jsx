import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input, Button } from 'antd';

// action types
import { uploadFile } from '../actions';

// constants
import { LEANCLOUD } from '../constants';

// CSS
import './main_dom.css';

// todo 选择文件后直接展示预览，提示上传中，成功展示操作按钮，失败展示原因以及重新上传按钮

class MainDOM extends Component {
  static propTypes = {
    uploadState: PropTypes.shape({
      success: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })),
      failed: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
    uploadFile: PropTypes.func.isRequired,
  };

  static defaultProps = {
    uploadState: {
      success: [],
      failed: [],
    },
  };

  // 处理 input file 上传的文件
  handleInput(event) {
    console.log(this.props);
    const { files } = event.target;
    for (let i = 0; i < files.length; i += 1) {
      this.props.uploadFile(LEANCLOUD, files[i]);
    }
  }

  render() {
    // 通过传递事件激活隐藏的 input file 控件
    let hiddenFileInput = null;
    const activeFileInput = () => hiddenFileInput.click();
    // 上传成功的文件 DOM
    const successLis = this.props.uploadState.success.map(item => (
      <li key={item.url}>
        <article className="image-preview">
          <img src={item.url} alt={item.name} />
        </article>
        <article className="operate-bar">
          <Input
            addonAfter={
              <Icon
                id="copyCodeBtn"
                type="copy"
                style={{ cursor: 'pointer' }}
                data-clipboard-text={item.url}
              />
            }
            defaultValue={item.url}
            disabled
          />
          <Button id="copyCodeBtn" data-clipboard-text={`![${item.name}](${item.url})`}>markdown</Button>
          <Button id="copyCodeBtn" data-clipboard-text={`<img src="${item.url}" alt="${item.name}">`}>HTML</Button>
          <Button id="copyCodeBtn" onClick={() => window.open(item.url, item.name)}>打开</Button>
        </article>
      </li>
    ));
    // JSX
    return (
      <section id="main" style={this.props.uploadState.success.length ? { paddingTop: 40 } : {}}>
        <div
          className="upload-content"
          onClick={activeFileInput}
          onKeyPress={() => undefined}
          role="button"
          tabIndex="0"
          style={this.props.uploadState.success.length ? { height: 184 } : {}}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => this.handleInput(e)}
            ref={(input) => {
              hiddenFileInput = input;
            }}
            style={{ display: 'none' }}
          />
          <Icon type="inbox" style={{ color: '#40a9ff', fontSize: '64px' }} />
          <p>截图粘贴、拖拽图片、点击上传</p>
          <p>支持单张和多张同时上传，支持格式 jpg / jpeg / png / gif 等类型 </p>
        </div>
        <article className="preview-content">
          <ul className="success-list">
            {successLis}
          </ul>
        </article>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    uploadState: state.uploadState,
  };
};

export default connect(mapStateToProps, { uploadFile })(MainDOM);
