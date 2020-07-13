# 使用Visual Studio Code 連結Vagrant SSH 目標 (Ubuntu 18.04)

1. vagrant up 啟動虛擬機

2. 輸入 vagrant ssh-config  查看 SSH 配置檔案  

3. vs code 安裝  Remote-SSH

4. 左下角 的按鈕 按下後 選擇 Remote-ssh: Open configuration file  選擇 配置文件

5.複製配置 vagrant ssh-config 內容 到 配置文件

6. 左下角 的按鈕 按下後 選擇 Remote-ssh: Connect to Host  連線機器
