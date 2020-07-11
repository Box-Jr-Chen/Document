# 手動部屬LNMP +R 環境

目標環境 Ubuntu 18.04

可用以下指令檢查Ubuntu版本
lsb_release -a

### 先安裝 apt 套件管理系統

    sudo apt install software-properties-common

## 下載NGIGX

### 首先加入Nginx源

    sudo add-apt-repository ppa:ondrej/nginx 

### 安裝Nginx

    sudo apt-get install nginx 
    
### 啟動Nginx    

    sudo service nginx restart
    
## 下載MySQL

    sudo apt-get  install mysql-server -y
    
    
如果安裝時沒有設定密碼，可以輸入以下指令進入配置

    sudo vim /etc/mysql/debian.cnf
    
此檔案開啟後可以很快速的看到 MySQL 預設的用戶名稱和密碼，最最重要的是用戶名的不是 root，
而是debian-sys-maint。    
要進入MySQL服務的話使用以下指令，中間部分是要填入你本機中 MySQL 的用戶名。

    mysql -u debian-sys-maint -p

進入mysql以後透過以下指令修改root 的密碼

    use mysql;
    UPDATE user SET plugin='mysql_native_password' WHERE User='root'
    UPDATE mysql.user SET authentication_string=PASSWORD('xxxx') WHERE USER='root';FLUSH PRIVILEGES;
   
## 安裝PHP
加入PHP源

     sudo add-apt-repository ppa:ondrej/php

先更新

     sudo apt-get update

安裝php 以及plugin

    sudo apt-get install php-fpm php-cli php-mysql php-gd php-tidy php-xmlrpc
    

到php.ini 裡面更改 cgi.fix_pathinfo 為 0
先到根目錄 再到

    sudo vim /etc/php/7.4/fpm/php.ini
    
(vagrant ssh 使用vim 發現無法修改儲存  轉換使用vscode 改 並將文件增加寫入權限)
增加權限 

    sudo chmod 766 /etc/php/7.4/fpm/php.ini
    
結束後重啟php-fpm

    sudo service php7.4-fpm restart
    
修改檔案： /etc/nginx/sites-available/default

    sudo vim /etc/nginx/sites-available/default
    
增加權限： /etc/nginx/sites-available/default    

    sudo chmod 766 /etc/nginx/sites-available/default
    
以下為修改內容:

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.php index.html index.htm index.nginx-debian.html;

 
        server_name _;
        location / {
                try_files $uri $uri/ /index.php?$args;
        }

        location ~ \.php$ {
                try_files $uri =404;
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
 
                fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include fastcgi_params;
        }

        location ~ /\.ht {
                deny all;
        }

    }
    
重啟nginx

    sudo service nginx restart


開啟/var/www/html 權限，並新增info.php

    sudo chmod 777 /var/www/html
    
ingo.php

    <?php
       phpinfo();
    ?>
    
## 安裝Composer 

先確保是否安裝必要文件

    sudo apt update
    sudo apt install wget php-cli php-zip unzip
    
 安裝   composer
 
    sudo apt-get install composer
另一種安裝   composer   

    curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
    
用以下指令檢查版本

    composer --version
    
## 開啟 laravel 新專案

    composer create-project --prefer-dist laravel/laravel (project_name)
    
- 遇到問題: Your requirements could not be resolved to an installable set of packages
  解决办法：直接忽略版本就是了

    composer install --ignore-platform-reqs 
    或者 
    composer update --ignore-platform-reqs

- 遇到問題2 : laravel.log could not be opened?
 在新建的laravel 專案中，開放storage權限
    
    chmod -R 777 storage
    
- 遇到問題3 : No application encryption key has been specified.
  執行以下指令即可
  
      php artisan key:generate
   
   
