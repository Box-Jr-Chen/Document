# 設定環境 Nginx+RTMP+Windows10


下載  Nginx Gryphon 版本 
-- nginx 下載路徑 http://nginx-win.ecsds.eu/download/

下載 nginx-rtmp-module

nginx-rtmp-module下载地址：https://github.com/arut/nginx-rtmp-module

保證stat.xls的目錄為:

`nginx-x.xx.xxx-Gryphon\nginx-rtmp-module\stat.xsl`



# 簡易搭建 Nginx+RTMP

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



# 使用VideoJS 讓網頁播放視訊流

由於無法直接透過video 標籤 直接播放視訊流 所以必須要透過Video.js去播放

        <head>
            <link href="https://vjs.zencdn.net/7.8.4/video-js.css" rel="stylesheet" />

            <!-- If you'd like to support IE8 (for Video.js versions prior to v7) -->
            <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
            <script src="https://vjs.zencdn.net/7.8.4/video.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/videojs-flash@2/dist/videojs-flash.min.js"></script>
          </head>

          <body>
            <video
              id="my-video"
              class="video-js"
              controls
              preload="auto"
              width="1280"
              height="720"
              data-setup="{}"
            >
              <!-- <source src="test.mp4" type="video/mp4" /> -->
              <!-- rtmp://127.0.0.1:1935/hls -->
              <source src="rtmp://127.0.0.1:1935/live/home" type="rtmp/flv" />
            </video>

            <script>
            var player = videojs('my-video');
            videojs('my-video', {techOrder: ['flash', 'html5']});
            videojs.options.flash.swf = 'video.swf';
            player.ready(function() {
            this.play();
            });
            </script>
          </body>


# 簡易搭建Nginx+HLS


