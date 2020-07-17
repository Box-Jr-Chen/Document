# DockerCompose+laradock 部屬laravel 環境

### 0.Laradock 介紹

[laradock官網](https://laradock.io/)

Laradock是一個基於docker的PHP開發環境。使用Laradock可以很快的啟動一個用於PHP開發的docker替代。

### 1.安裝Docker 

    curl -fsSL get.docker.com -o get-docker.sh
    sh get-docker.sh
    
### 2. 安裝Docker-compose

     sudo curl -L https://github.com/docker/compose/releases/download/1.26.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    
### 3. 下載 laradock

    git clone https://github.com/Laradock/laradock.git
    
### 4. 建立存放 laravel 的路徑

    mkdir www
 
 ### 4. 編輯laradock設定

複製env-example 改為.env

    cd laradock
    cp env-example .env
    nano .env
 
修改以下內容: 
 
    APP_CODE_PATH_HOST=../www
    NGINX_HOST_HTTP_PORT=8000
    NGINX_HOST_HTTPS_PORT=4430
    MYSQL_PORT=3307
 
檢查設定 php my admin:

    PMA_USER=default
    PMA_PASSWORD=secret
    PMA_ROOT_PASSWORD=secret
    PMA_PORT=8080
    
確認 laradock/.env:

    MYSQL_VERSION=latest
    MYSQL_DATABASE=default
    MYSQL_USER=default
    MYSQL_PASSWORD=secret
    MYSQL_PORT=3307
    MYSQL_ROOT_PASSWORD=root
 
 ### 5.Docker 修改 Nginx 設定
 複製example 到xxxx.conf

    cp -r nginx/sites/laravel.conf.example nginx/sites/laravel.test.conf
    nano nginx/sites/laravel.test.conf

修改為:

    root /var/www/public
    
 ### 6.執行Container  mginx + mysql +phpmyadmin  

    sudo docker-compose up -d nginx mysql phpmyadmin
    
*停止運行可下指令 docker-compose down


進入工作區域:

    sudo docker-compose exec workspace bash
    
如果沒有專案，創建新的專案:

    composer create-project laravel/laravel --prefer-dist .
    exit
    
權限修改:

    docker-compose exec php-fpm id www-data
    sudo chown -R 1000:1000 www/storage
    
    如果無法寫入，嘗試 
    cd ..
    sudo chmod -R 777 www/storage
    
讓 Laravel 連線 MySQL:

    cd www
    nano .env
    
修改如下:

    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=default
    DB_USERNAME=default
    DB_PASSWORD=secret
    
存檔後接著:

    exit
    docker-compose exec workspace bash
    php artisan migrate
    
 ### 7.訪問 phpMyAdmin:

  *使用root 登入phpMyAdmin失敗!

  Laradock數據緩存問題，刪除Laradock中mysql的數據，重新構建即可：

  關閉服務docker-compose down

  刪除Laradock中mysql的數據rm -rf〜/ .laradock / data / mysql

  這裡會刪除數據庫中的所有數據，如果需要，請先備份數據庫
 
  重新構建mysql docker-compose構建mysql

  重新啟動服務docker-組成nginx mysql phpmyadmin
