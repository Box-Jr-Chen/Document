# 製作Image，並使用DockerHub做編譯使用

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


### 3. 測試建立Nodejs鏡像環境

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


- 編譯鏡像

      sudo docker image build -t box621863/docker_tutorial_nodejs:v01 .
      
`-t`為標籤，他後面是標簽名，`v01`為子標籤，後面還有個`.`不能忘記，它的意思以我當前目錄為根目錄進行建立(注意: 不能大寫) 

剛剛因為下載node 故此建立會非常快，如果沒有下載，他會先從DockerHub上先下載

再用`sudo docker image ls`可以看到我們剛剛建立的鏡像`box621863/docker_tutorial_nodejs`

- 運行鏡像

      sudo docker container run  box621863/docker_tutorial_nodejs:v01
      
如果出現剛剛測試文字，代表運行成功。 

`container` 將鏡像實例化

### 4. 提交到GitHub

      git add .

      git commit -m "first upload"
      
      git push
      
      git tag v01
      
      git tag
      
      git push origin v01
      
### 5. 使用DockerHub進行雲編譯  

- 必須申請一個帳號

- 按下Repositories 建立儲存

- 與github 連接，並選擇建立好的Docker_tutorial_nodejs 儲存庫

- 按下Create 建立

- 之後Builds 裡面點選Build configurations

- 在 BUILD RULES 新增一個欄位，並填入
  
  Source Type  Source   Docker Tag
  Tag          v01      v01 
  
- 按下Save 儲存  

- 在Automated Builds 底下的選項，點選Trigger 建立

- 編譯好了以後在Tag 上會看到新的標籤，代表編譯成功可以使用

### 6. 使用剛打包的鏡項運行環境

取的剛剛建立的鏡像
   
      sudo docker image pull box621863/demo_first_nodejs:v01

測試剛剛建立的鏡像

      sudo docker container run box621863/demo_first_nodejs:v01
