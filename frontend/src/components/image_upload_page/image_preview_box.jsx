import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Button } from 'antd';

// CSS
import './image_preview_box.css';

const ImagePreview = (props) => {
  const successLis = props.imgList.map(item => (
    <li
      className="d-flex flex-column"
      key={item.url}
    >
      <article className="image-preview">
        <img src={item.url} alt={item.name} />
      </article>
      <article className="operate-bar d-flex flex-row">
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
  return (
    <article id="image-preview-content">
      <ul className="success-list">
        {successLis}
      </ul>
    </article>
  );
};

ImagePreview.propTypes = {
  imgList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.required,
    url: PropTypes.string.required,
  })),
};

ImagePreview.defaultProps = {
  imgList: [],
};


export default ImagePreview;
