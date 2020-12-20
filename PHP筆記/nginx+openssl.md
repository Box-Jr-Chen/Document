### 使用openssl


# 1.在nginx 的資料夾 創建 ssl 資料檔

linux :

`sudo mkdir /etc/nginx/ssl`

# 2. 使用ssl 創建憑證

在ssl資料夾創建憑證 

`sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt`


- req：使用 X.509 Certificate Signing Request（CSR） Management 產生憑證。

- x509：建立自行簽署的憑證。

- nodes：不要使用密碼保護，因為這個憑證是 NGINX 伺服器要使用的，如果設定密碼的話，會讓伺服器每次在啟動時書需要輸入密碼。

- days 365：設定憑證的使用期限，單位是天，如果不想時常重新產生憑證，可以設長一點。

- newkey rsa:2048：同時產生新的 RSA 2048 位元的金鑰。

- keyout：設定金鑰儲存的位置。

- out：設定憑證儲存的位置。



# 3. 在conf/nginx.conf 修改

    server {
      listen 80 default_server;
      listen [::]:80 default_server;

      # 加入 SSL 設定
      listen 443 ssl default_server;
      listen [::]:443 ssl default_server;

      # 憑證與金鑰的路徑
      ssl_certificate /etc/nginx/ssl/nginx.crt;
      ssl_certificate_key /etc/nginx/ssl/nginx.key;

      # ...
    }


# 4. 重新開啟nginx

`sudo service nginx restart`


開啟 HTTPS 的網址，正常來說瀏覽器會有憑證授權不可靠的警告，

而如果憑證的 FQDN 跟伺服器的 FQDN 沒有符合的話，也會出現網址不符的警告。

網址不符的警告只要修改伺服器的網址或是重新產生一張符合網址的憑證就可以解決，

而憑證授權的問題是由於我們使用的憑證是自行簽署的，所以這個憑證授權的警告是一定會出現的。

# 5. http 導向 https

如果希望所有的使用者都使用加密的 HTTPS 連線，不要使用沒有加密的 HTTP 的話，

可以修改一下 NGINX 的設定，讓所有的 HTTP 的網址自動導向至 HTTPS 的網址。

    server {
      listen 80 default_server;
      listen [::]:80 default_server;

      # 導向至 HTTPS
      rewrite ^(.*) https://$host$1 permanent;
    }
    server {
      # SSL 設定
      listen 443 ssl default_server;
      listen [::]:443 ssl default_server;

      # 憑證與金鑰的路徑
      ssl_certificate /etc/nginx/ssl/nginx.crt;
      ssl_certificate_key /etc/nginx/ssl/nginx.key;

      # ...
    }
