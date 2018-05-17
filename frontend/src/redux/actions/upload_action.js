import { message } from 'antd';
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
  LEANCLOUD,
  QINIU,
  ALIYUN,
} from '../constants/index';
import { LOCAL, uploadToLeancloud } from '../../utils/leancloud/index';

/**
 * lean cloud 请求处理， 返回一个 thunk 函数
 * @param fileData 文件信息 input file 元数据
 * */
const LEAN_CLOUD_REQUEST = fileData => async (dispatch) => {
  try {
    const result = await uploadToLeancloud(LOCAL, fileData);
    const { attributes } = result;
    const { name, url } = attributes;
    dispatch({
      type: UPLOAD_SUCCESS,
      payload: { name, url },
    });
  } catch (e) {
    message.error(`${fileData.name} 上传失败，请检查存储配置后重试`);
    dispatch({
      type: UPLOAD_FAILED,
      payload: { name: fileData.name },
    });
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
