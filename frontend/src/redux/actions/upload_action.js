import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
  LEANCLOUD,
  QINIU,
  ALIYUN,
  SUCCESS,
  ERROR,
} from '../constants/index';
import { LOCAL, uploadToLeancloud } from '../../utils/leancloud/index';

/**
 * common response 返回一个 action
 * @param status 响应状态 SUCCESS, ERROR
 * @param name 文件名
 * @param url 上传成功后得到的资源链接
 * */
const COMMON_RESPONSE = (status, name, url) => {
  let resultAction = {};
  switch (status) {
    case SUCCESS:
      resultAction = {
        type: UPLOAD_SUCCESS,
        payload: {
          name,
          url,
        },
      };
      break;
    case ERROR:
      resultAction = {
        type: UPLOAD_FAILED,
        payload: {
          name,
        },
      };
      break;
    default:
  }
  return resultAction;
};

/**
 * lean cloud 请求处理， 返回一个 thunk 函数
 * @param fileData 文件信息 input file 元数据
 * */
const LEAN_CLOUD_REQUEST = fileData => async (dispatch) => {
  try {
    const result = await uploadToLeancloud(LOCAL, fileData);
    const { attributes } = result;
    const { name, url } = attributes;
    dispatch(COMMON_RESPONSE(SUCCESS, name, url));
  } catch (e) {
    console.log(e);
    dispatch(COMMON_RESPONSE(ERROR, fileData.name));
  }
};

/**
 * uploadFile 通用图片上传处理，返回一个 action
 * @param hostTarget 目标空间 LEANCLOUD, QINIU, ALIYUN
 * @param fileData 文件信息 input file 元数据
 * */
export const uploadFile = (hostTarget, fileData) => {
  let resultAction = {};
  switch (hostTarget) {
    case LEANCLOUD:
      resultAction = LEAN_CLOUD_REQUEST(fileData);
      break;
    case QINIU:
      break;
    case ALIYUN:
      break;
    default:
  }
  return resultAction;
};

export default uploadFile;
