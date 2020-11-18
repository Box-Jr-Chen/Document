# laravel在nginx上使用api

加入以下代碼:

        `location /api  {
             root "D:/Project/TMS_Cloud/Nginx_Server/html_php/laravel_tms/public";
            try_files $uri $uri/ /index.php?$query_string;
        }`
