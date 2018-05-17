// const AV = require('leancloud-storage');
import * as AV from 'leancloud-storage';

let OWNER = '';

export const LOCAL = 'LOCAL';
export const URL = 'URL';
export const STREAM = 'STREAM';

function initLeancloud(APP_ID, APP_KEY, ownerEmail) {
  AV.applicationId = undefined; // 源码里有这项检查，不然没法直接重置
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
  });
  OWNER = ownerEmail;
}

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
  file.metaData('owner', OWNER);
  file.metaData('timestamp', Date.now());
  const result = await file.save();
  return result;
}

export { uploadToLeancloud, initLeancloud };
