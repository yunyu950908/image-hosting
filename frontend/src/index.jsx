import React from 'react';
import ReactDOM from 'react-dom';
import ClipboardJS from 'clipboard';

// react router
import { ConnectedRouter } from 'react-router-redux';

// antd
import { LocaleProvider, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';

// redux
import { Provider } from 'react-redux';
import configureStore from './redux/store';

// App
import App from './App/App';
// import registerServiceWorker from './registerServiceWorker';

// history
import history from './utils/history';

// clipboard
const clipboard = new ClipboardJS('#copyCodeBtn');
clipboard.on('success', () => message.success('成功复制到剪切板'));
clipboard.on('error', () => message.error('复制到剪切板失败，似乎除了点问题呢~'));

moment.locale('zh-cn');

const store = configureStore();

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </LocaleProvider>
  , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App/App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    );
  });
}
// registerServiceWorker();
