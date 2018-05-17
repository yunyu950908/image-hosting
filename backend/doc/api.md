## 1. 注册
```
/user/signup 用户注册
@param userInfo email String required
@param userInfo password String required
@param userInfo messageId String required
@param userInfo securityCode String required
```

- 请求
```json
{
  "email": "ioly@ioly.com",
  "password": "Password2018",
  "messageId": "<e574fd86-89ed-282e-86a8-53bfed309121@163.com>",
  "securityCode": "asd123"
}
```

- 响应
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "email": "ioly@ioly.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp"
  }
}
```

---

## 2. 登录
```
/user/login 用户登录
@param userInfo email String required
@param userInfo password String required
```

- 请求
```json
{
  "email": "ioly@ioly.com",
  "password": "Password2018"
}
```

- 响应
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "email": "ioly@ioly.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp",
    "hostSetting": {
      "leancloud": {
        "APP_ID": "尚未配置",
        "APP_KEY": "尚未配置"
      }
    }
  }
}
```

---

## 3. 修改 email 或 密码
```
/user/update 更新 email 或 密码
@param userInfo action String required 'email' 'pwd'
@param userInfo securityCode String required
@param userInfo oldEmail String required
@param userInfo newEmail String
@param userInfo oldPwd String
@param userInfo newPwd String
```

- 请求
> header
```http request
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp"
```
> body
```json
{
  "action": "email",
  "securityCode": "asd123",
  "oldEmail": "old_email@ioly.com",
  "newEmail": "new_email@ioly.com"
}
```

- 响应
```json
{
  "code": 0,
  "msg": "成功"
}
```

---

## 4. 忘记密码
```
/user/forget 忘记密码
@param userInfo email String required
@param userInfo securityCode String required
```

- 请求
```json
{
  "email": "ioly@ioly.com",
  "securityCode": "asd123"
}
```

- 响应
```json
{
  "code": 0,
  "msg": "成功"
}
```

---

## 5. 存储配置
```
/user/store 用户的存储配置
@param storeConfig action String required 'get' 'set'
@param storeConfig providerName String
@param storeConfig providerConfig Object
```

- 请求
> header
```http request
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp"
```
> body
```json
{
  "action": "set",
  "providerName": "leancloud",
  "providerConfig": {
    "APP_ID": "id123456789",
    "APP_KEY": "key123456789"
  }
}
```

- 响应
```json
{
  "code": 0,
  "msg": "成功",
  "data": {
    "email": "ioly@ioly.com",
    "hostSetting": {}
  }
}
```

---

### 6. 邮件验证码
```
/user/mail
@param email String required
```

- 请求
```json
{
  "email": "ioly@ioly.com"
}
```

- 响应
```json
{
  "code": 0,
  "msg": "成功"
  "data": {
    "messageId": "<e574fd86-89ed-282e-86a8-53bfed309121@163.com>"
  }
}
```