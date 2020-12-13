# 設定環境 Nginx+RTMP+Windows10


下載  Nginx Gryphon 版本 
-- nginx 下載路徑 http://nginx-win.ecsds.eu/download/

下載 nginx-rtmp-module

nginx-rtmp-module下载地址：https://github.com/arut/nginx-rtmp-module

保證stat.xls的目錄為:

`nginx-x.xx.xxx-Gryphon\nginx-rtmp-module\stat.xsl`

備註:
   nginx -t 可查閱運行狀況

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



### 使用VideoJS 讓網頁播放視訊流

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


開啟conf資料夾找到nginx-win.conf檔案,配置rtmp，
可以複製改名為nginx.conf。

基本配置:

    #user  nobody;
    worker_processes  1;

    events {
        worker_connections  1024;
    }

    rtmp_auto_push on;

    http {
        include       mime.types;
        default_type  application/octet-stream;
        sendfile        on;
        keepalive_timeout  65;


        server {
            listen       80;
            server_name  localhost;

            location / {
                root   html;
                index  index.html index.htm;
            }
            location /live_hls{
                types{
                    #m3u8 type设置
                    application/vnd.apple.mpegurl m3u8;
                    #ts分片文件设置
                    video/mp2t ts;
                }
                #指向访问m3u8文件目录
                alias ./m3u8File;
                    add_header Cache-Control no-cache; #禁止缓存
            }
            location /control{
                rtmp_control all;
            }
            location /stat{
                rtmp_stat all;
                rtmp_stat_stylesheet stat.xsl;
            }
            location /stat.xsl{
                root ./html;
            }
        }
    }

    rtmp {
        server {
            listen 1935;
            chunk_size 4096;

            application vod
            {
                play ./vod;   #视频文件存放位置
            }
            application live {
                 live on;  #开启直播
                 hls on;                      #开启hls直播。这个参数把直播服务器改造成实时回放服务器
                 #wait_key on;                #对视频切片进行保护，这样就不会产生马赛克了
                 hls_path ./m3u8File;         #切片视频文件存放位置（HLS，m3u8文件存放位置）
                 hls_fragment 2s;             #每个视频切片的时
                 hls_playlist_length 16s;
                 recorder myRecord
                 {
                    record all manual;
                    record_suffix _.flv;
                    record_path ./rec;
                }
            }
        }
    }
    

打開cmd，透過ffmpeg 將mp4或視訊流轉成h.264 送到hls server

`ffmpeg -f dshow -i video="screen-capture-recorder" -f dshow -rtbufsize 1024M -pix_fmt yuv420p -vcodec libx264 -s 1280x720 -r 25 -q 10 -ar 44100 -f flv rtmp://127.0.0.1/live/index`

HLS 特性:

1. 將檔案分割成多個片段（通常為不超過 10 秒、副檔名為 .ts 的小檔 ）。

2. 用一個索引文字檔 （index file）記錄這些小檔案的順序與位址，即.m3u 檔。（常見的 .m3u 檔有 .m3u（Windows-1252）與 .m3u8（UTF-8））。

3. Client 向 server 請求時，server 會回傳對應的索引文字檔（如 .m3u8 檔）

4. Client 拿到索引文字檔後，會解析檔案、按照播放列表逐一向 server 請求播放串流片段（如 .ts 檔）。

5. 當索引文字檔內記載的檔案片段下載完後，client 即再請求下一個索引文字檔，繼續重複步驟 4 實現串流的功能。


### 使用VideoJS 讓網頁播放視訊流  

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
        class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
        controls
        preload="auto"
        width="1280"
        height="720"
        autoplay="true" 
        data-setup="{}">

        <source  src="http://192.168.68.104/live_hls/index.m3u8"  type="application/x-mpegURL" />
      </video>

      <script>
       var player = videojs('my-video');
        player.play();
      </script>
    </body>
    
