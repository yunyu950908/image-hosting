const nodemailer = require('nodemailer');
const moment = require('moment');
const { mailSetting } = require('../config/setting');

/**
 * transporter nodemailer transporter
 * */
const transporter = nodemailer.createTransport({
  host: mailSetting.host,
  port: 465,
  secure: true,
  auth: {
    user: mailSetting.id,
    pass: mailSetting.pwd,
  },
});

/**
 * getSecurityCode 获取 6 位 随机码
 * */
function getSecurityCode() {
  let code = Math.random().toString(36);
  while (code.length < 8) {
    code = Math.random().toString(36);
  }
  code = code.substr(2, 6);
  return code;
}

/**
 * getMailOpts 创建邮件内容
 * @param userEmail String 目标邮箱
 * @param securityCode String 随机码
 * */
function getMailOpts(userEmail, securityCode) {
  return {
    from: `"ioly_mail_service"<${mailSetting.id}>`,
    to: userEmail,
    subject: `ioly 邮件验证 - ${moment(Date.now()).format('YYYY-MM-DD hh:mm:ss')}`,
    text: (`\n
    您好，欢迎使用 ioly 邮件服务。\n
    您此次操作的动态验证码是：${securityCode}\n
    验证码有效期 5 分钟，或使用一次后失效，请及时进行验证。\n
    `),
  };
}

/**
 * sendMail 发送邮件
 * @param userEmail String 目标邮箱
 * */
async function sendMail(userEmail) {
  const securityCode = getSecurityCode();
  const mailOpts = getMailOpts(userEmail, securityCode);
  const result = await transporter.sendMail(mailOpts);
  return {
    securityCode,
    accepted: result.accepted[0],
    messageId: result.messageId,
  };
}

module.exports = {
  sendMail,
};
