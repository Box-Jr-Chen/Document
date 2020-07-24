# golang安裝

 目標Ubuntu18.04
 
透過 wget 下載

    wget https://dl.google.com/go/go1.14.6.linux-amd64.tar.gz 

解壓縮gz

    sudo tar -xvf go1.11.5.linux-amd64.tar.gz
    
把 binary 檔放到 /usr/local:

    sudo mv go /usr/local
    
然後設定 Golang 的環境變數, 一般需要設定 GOROOT, GOPATH 及 PATH, 開啟 .profile 檔:

    sudo nano  ~/.profile
