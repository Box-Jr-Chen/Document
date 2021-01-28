# jupyter基本使用

- 預設資料根目錄對應 `C:\Users\xxxxxx`

- 可以到D槽資料夾 運行`cmd` -> `jupyter notebook`，轉到其餘槽。(需要在python虛擬環境)

- 文件名叫`.ipynb(ipython notebook)`

- `Ctrl+Enter`、 運行
- `Alt+Enter`、  運行，並插入一行
- `Shift+Enter`  運行，選中下一個單元

- `+` 往下新增一閣

- 按下單元以後，再按下`a`(above) 往上插入一格
- 按下單元以後，再按下`b`(bellow) 往下插入一格

- 按下單元以後，再按下`dd`(delete) 刪除

- `tab`代碼提示

- 把光標放進()裡面，按下`shift + tab` API 使用提示

- 魔法指令 :
      
      #代碼運行計時
       import time
       time.time() 
       
       #轉換成->
       %time  ##只能控制當前那行代碼
       
       %%time  ##控制當前多行代碼
       
  
