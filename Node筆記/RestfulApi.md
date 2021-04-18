#  RestfulApi 紀錄




`npm init` 初始檔案

## 安裝

- `npm install express nodemon`  安裝express、nodemon


在 ‵paclage.json`內 :

      "scripts": {
        "start":"nodemon app.js"
      },


- 'npm install mongoose'   安裝mongoose


-----------------------------------------

新增‵app.js`

- 基本API

      const express = require('express');

      const app =express();

      app.get('/',(req,res)=>{
          res.send('We are on home');
      });

      app.listen(3000);
