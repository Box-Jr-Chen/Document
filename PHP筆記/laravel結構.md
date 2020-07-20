
# laravel結構

### 網站開發常見的元件

  - 身份驗證
  - 輸入驗證
  - 資料庫存取
  - 模板 (templete)
  - 發信
  - 社群第三方服務串接(Facebook, Twitter...)
  - queue
  - 發送 email
  - Cache

### Laravel 的特色

約定大於配置 (convention over configuration)

簡化學習曲線

### 目錄結構
根目錄

    app  (主體目錄  controllers、Middleware)
    bootstrap
    config
    database
    public
    resources
    routes
    storage
    tests
    vendor
    migrations
    logs
    server.php
    
app 目錄

    Console
    Exceptions
    Http
    Providers
    
零星的檔案

    .env
    artisan
    composer.json, composer.lock
    gulpfile.js
    package.json
    phpunit.xml
