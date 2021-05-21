# sequelize+pg

- 安裝 `npm install --save sequelize`

- 官網: `https://sequelize.org/master/`

- 參考 https://blog.echobind.com/a-guide-for-restful-apis-with-node-sequelize-postgres-63636d026d5d

- 參考 https://www.youtube.com/watch?v=oWSN9AQK1RM
- 
# 注意步驟(此教學更改檔案)

1. `npx sequelize-cli init` 在window 上使用指定初始。
2. 更改 `config.json` 為`config.js`，並修改內容。
3. 新稱`model`以後，在`index.js`修改   `const config = require('../config/config.js')[env];`
