# 手動部屬LNMP +R 環境

目標環境 Ubuntu 18.04

可用以下指令檢查Ubuntu版本
lsb_release -a

### 先安裝 apt 套件管理系統

    sudo apt install software-properties-common

### 下載NGIGX

### 首先加入Nginx源

    sudo add-apt-repository ppa:ondrej/nginx 

### 安裝Nginx

    sudo apt-get install nginx 
