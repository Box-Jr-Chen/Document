#  RestfulApi 紀錄

`npm init` 初始檔案

`npm install express nodemon`  安裝express、nodemon


在 ‵paclage.json`內 :

      "scripts": {
        "start":"nodemon app.js"
      },

-----------------------------------------

新增‵app.js`

- 基本API

      const express = require('express');

      const app =express();

      app.get('/',(req,res)=>{
          res.send('We are on home');
      });

      app.listen(3000);
