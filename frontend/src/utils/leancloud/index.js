const AV = require('leancloud-storage');

// todo APP_ID APP_KEY owner 后续通过注册登录从数据库取
const APP_ID = 'GwoK8CzIYmvYA1VeNEQIYqWr-gzGzoHsz';
const APP_KEY = 'OQXqS9w2i7HATkvFmqYmKgCP';
const owner = '登录账户的邮箱';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
});

// console.log('module leancloud run!');

export const LOCAL = 'LOCAL';
export const URL = 'URL';
export const STREAM = 'STREAM';

async function uploadToLeancloud(from, fileInfo) {
  const { name = '', url = '', data = '' } = fileInfo;
  let fileData = null;
  switch (from) {
    case LOCAL:
      fileData = fileInfo;
      break;
    case URL:
      fileData = url;
      break;
    case STREAM:
      fileData = data;
      break;
    default:
      throw new Error(`params error, need from: ${from}`);
  }
  const file = new AV.File(name, fileData);
  file.metaData('owner', owner);
  file.metaData('timestamp', Date.now());
  const result = await file.save()
    .catch((e) => {
      throw e;
    });
  return result;
}

export { uploadToLeancloud };
