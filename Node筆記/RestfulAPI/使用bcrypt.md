# 使用bcrypt


- 安裝 `pm i bcrypt`

- 使用 :

   `const bcrypt = require('bcrypt')`
   `await bcrypt.hash("123456",await bcrypt.genSalt())`
