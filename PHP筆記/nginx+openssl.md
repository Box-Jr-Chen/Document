### 使用openssl


# 1.在nginx 的資料夾 創建 ssl 資料檔

linux :
`sudo mkdir /etc/nginx/ssl`

# 2. 使用ssl 創建憑證

在ssl資料夾創建憑證 

`sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt`
