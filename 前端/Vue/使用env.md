# 使用env

- 請注意，只有`NODE_ENV`，`BASE_URL`和以`UE_APP_`開頭的變量將通過webpack.DefinePlugin靜態嵌入到客戶端捆綁包中。 
  這是為了避免在機器上意外公開可能具有相同名稱的私鑰。
