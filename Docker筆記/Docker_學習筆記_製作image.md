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
