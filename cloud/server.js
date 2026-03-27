const express = require('express');
const COS = require('cos-nodejs-sdk-v5');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 我已经帮你填好你的密钥了
const cos = new COS({
  SecretId: "AKIDKctykKp8GBhAVikcMxNk0875udEfx76u",
  SecretKey: "jIfpocJrESXTEwZ4OYW9mHbjeR2gGsY9",
});

// 安全上传接口（前端调用这个，不暴露密钥）
app.post('/api/get-upload-auth', (req, res) => {
  const { name, type } = req.body;
  const key = `upload/${Date.now()}_${name}`;

  cos.getCredential({
    Bucket: 'jig-8-1416238546',
    Region: 'ap-guangzhou',
    Key: key,
    Method: 'PUT'
  }, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      uploadUrl: `https://jig-8-1416238546.cos.ap-guangzhou.myqcloud.com/${key}`,
      auth: data.authorization
    });
  });
});

app.listen(3000, () => {
  console.log('✅ 安全云存储服务已启动：http://localhost:3000');
});