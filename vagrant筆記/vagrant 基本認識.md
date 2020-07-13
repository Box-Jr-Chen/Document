# Vagrant 筆記

### Vagrant 指令
vagrant init xxx/xxx  可初始化簡單的範本 ，並設定需要的box，目前使用("generic/ubuntu1804")

vagrant up 啟動虛擬機 在vagrant cloud 下載box

vagrant halt 關閉虛擬機

vagrant destroy 刪除虛擬環境

vagrant ssh 登入虛擬環境
再按下exit 離開虛擬環境

### Vagrantfile

  目前遇到狀況，vagrant init 以後先不進行修改，執行vagrant up 先啟動虛擬機並執行環境，之後在修改Vagrantfile 

- BOX配置

  config.vm.box = "generic/ubuntu1804"
  
- 對應實體機器的IP位置

  config.vm.network "forwarded_port", guest: 80, host: 80, host_ip: "127.0.0.1"
  
