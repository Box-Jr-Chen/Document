# express+socketio+OpenSSL 教學

### 安裝SocketIO SDK
安裝 函式庫:

    npm install express socket.io moment
    npm install -D nodemon
    
package.json:

    {
      "name": "socketio_webrtc",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start":"node server",
        "dev":"nodemon server"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1",
        "moment": "^2.29.1",
        "socket.io": "^2.3.0"
      },
      "devDependencies": {
        "nodemon": "^2.0.6"
      }
    }



### 新增`app.js`

寫一段測試HTTPS

    const express = require('express')
    const https   = require('https')
    const path    = require('path')
    const fs      = require('fs')   //檔案io處理

    const app =express()


    app.use('/',(req,res,next)=>{
       res.send('Hello from SSL server')
    })


    const sslServer = https.createServer(
        {
          key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
          cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
        },
        app
      )

      sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'))
    



### 安裝 OpenSSL

 -https://www.openssl.org/ (網址)
 -https://slproweb.com/products/Win32OpenSSL.html (window 10 安裝檔)

下載 Win64 OpenSSL v1.1.1h Light

安裝好後 需要設置環境變數




### 創建SSL 檔案

1. 新增資料夾
  `mkdir cert`


  
2. 進入cert 資料夾

3.新增私鑰

`openssl genrsa -out key.pem`
  
4.利用私鑰新增CSR(certificate signing request)  

`openssl req -new -key key.pem -out csr.pem`
    
5.從CSR創建SSL 證書

`openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`
