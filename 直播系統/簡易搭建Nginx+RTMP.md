# 簡易搭建Nginx+RTMP_Windows10

下載  Nginx Gryphon 版本 
-- nginx 下載路徑 http://nginx-win.ecsds.eu/download/

下載 nginx-rtmp-module

nginx-rtmp-module下载地址：https://github.com/arut/nginx-rtmp-module

保證stat.xls的目錄為:

`nginx-x.xx.xxx-Gryphon\nginx-rtmp-module\stat.xsl`

開啟conf資料夾找到nginx-win.conf檔案,配置rtmp，
可以複製改名為nginx.conf。

基本配置:

    worker_processes  1;
    events {
        worker_connections  1024;
    }
    http {
        include       mime.types;
        default_type  application/octet-stream;

        sendfile           on;
        keepalive_timeout  65;
        server {
            listen       80;
            server_name  localhost;

            location / {
                root   html;
                index  index.html index.htm;
            }

            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
        }
    }
    
    rtmp {
        server {
            listen 1935;
            chunk_size 4000;

            application live {
                 live on;
            }
        }
    }
    
設定好FFMPEG    
下載VLC player


打開cmd，透過ffmpeg 將mp4或視訊流轉成h.264 送到rtmp server

`ffmpeg -re -i test.mp4 -vcodec libx264 -acodec aac -f flv rtmp://127.0.0.1:1935/live/home`
