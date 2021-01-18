# Pandas

### 安裝Pandas

`pip install pandas`

-參考   https://www.youtube.com/channel/UCguZS-y7codLSt6vpkVdnKg

### 單維度 Series

用來處理時間序列相關的資料(如感測器資料等)，主要為建立索引的一維陣列。

  Ex:
  
    import pandas as pd
    data = pd.Series("xxx")
    data.max() #找到最大值
    data.median() #找到中位數
    data = data*2 #放大兩倍


### 雙維度 DataFrame 

用來處理結構化(Table like)的資料，有列索引與欄標籤的二維資料集，例如關聯式資料庫、CSV 等等。

  Ex:
  
    import pandas as pd
    data = pd.DataFrame("xxx")
    data["欄位名稱"]
    data.iloc["列編號"]由0累加



### Panel

用來處理有資料及索引、列索引與欄標籤的三維資料集。
