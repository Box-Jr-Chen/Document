# 手動部屬LNMP +R 環境

目標環境 Ubuntu 18.04

可用以下指令檢查Ubuntu版本
lsb_release -a

### 先安裝 apt 套件管理系統

    sudo apt install software-properties-common

## 下載NGIGX

### 首先加入Nginx源

    sudo add-apt-repository ppa:ondrej/nginx 

### 安裝Nginx

    sudo apt-get install nginx 
    
### 啟動Nginx    

    sudo service nginx restart
    
## 下載MySQL

    sudo apt-get  install mysql-server -y
    
    
如果安裝時沒有設定密碼，可以透過

    sudo vim /etc/mysql/debian.cnf
    
進入配置    


