import React from 'react';
import moment from 'moment';

import { Icon } from 'antd';

const FooterDOM = () => (
  <section id="footer">
    <div className="footer-info">
      <Icon type="notification" />
      <time>{moment(Date.now()).format('YYYY-MM-DD')}</time>
    </div>
    <div className="footer-others">
      <a href="##">意见反馈</a>
      <a href="##">常见问题</a>
    </div>
  </section>
);

export default FooterDOM;
