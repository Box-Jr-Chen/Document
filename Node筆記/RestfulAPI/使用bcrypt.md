# 使用bcrypt


- 安裝 `pm i bcrypt`

- 匯入 :

   `const bcrypt = require('bcrypt')`
   
- 編碼:
   
   `await bcrypt.hash("123456",await bcrypt.genSalt())`
   
- 比較:

   `await bcrypt.compare(res.body.pass,database.pass)` 回傳布林
