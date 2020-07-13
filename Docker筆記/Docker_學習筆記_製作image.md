# 製作Image

- 目標Ubuntu18.04
- 製作Node.js應用環境


### 應用技術

- Node.js

- Git

- Github

- Docker

- Docker Hub

### 1. 建立GitHub 庫

- [DockerNodejsGitHub路徑](https://github.com/Box-Jr-Chen/Docker_tutorial_nodejs)

本地建立資料夾
   
    mkdir mydocker
    cd mydocker/
    
把GitHub 庫拷貝下來

    git clone https://github.com/(youraccount)/Docker_tutorial_nodejs
    
進入 Docker_tutorial_nodejs

    cd Docker_tutorial_nodejs

### 2. 從DockerHub取得Node6.16.1版本

用以下指令可查看本地有的image文件

    sudo docker image ls

從dockerHub 下載node:8.16.1

    sudo docker image pull node:8.16.1
    
再用`sudo docker image ls`指令查看，可在本地看到node 的image

`ll` 為github根目錄


### 3. 測試建立Nodejs環境

編寫一個nodejs應用
    
      nano helo.js
      
寫入以下測試文字
    
      console.log("This is a demo!!") 
      
      
編寫Dockerfile，文件名稱大小寫不能寫錯    
   
       nano Dockerfile 
       

並在Dockerfile裡面寫入以下指令:

      FROM node:8.16.1
      RUN mkdir /src
      COPY helo.js /src
      CMD ["node", "src/helo.js"]

`FROM node:8.16.1`  意指從node:8.16.1 這個映像建立起虛擬環境,

`RUN mkdir /src`    建立以後在虛擬環境裡建立資料夾src,

`COPY helo.js /src` 把本地的helo.js複製到虛擬環境裡資料夾src,

`CMD ["node", "src/helo.js"]`  使用CMD指令執行src/helo.js,


- 編譯運行環境

      sudo docker image build -t box621863/docker_tutorial_nodejs:v01 .
      
`-t`為標籤，他後面是標簽名，`v01`為子標籤，後面還有個`.`不能忘記，它的意思以我當前目錄為根目錄進行建立(注意: 不能大寫) 
剛剛因為下載node 故此建立會非常快，如果沒有下載，他會先從DockerHub上先下載
