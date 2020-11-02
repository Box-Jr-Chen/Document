### ubuntu18 問題

# ubuntu18 無法upgrade解決

發生問題:
   `解決更新套件或安裝套件遇到 - 無法將 /var/lib/dpkg/lock 鎖定`
  
輸入指令:
   `sudo lsof /var/lib/dpkg/lock`  

看到執行的PID，然後輸入指令，殺掉正在執行的:

   `sudo kill -9 (PID)  EX:   sudo kill -9 2090`
   
- 參考網址: https://learningsky.io/var-lib-dpkg-lock/   
