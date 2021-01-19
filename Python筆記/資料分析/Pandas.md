# Pandas

### 安裝Pandas

`pip install pandas`

-參考   https://www.youtube.com/channel/UCguZS-y7codLSt6vpkVdnKg

### 單維度 Series

用來處理時間序列相關的資料(如感測器資料等)，主要為建立索引的一維陣列。

  
    import pandas as pd
    data = pd.Series("xxx")
    
    數字:
    data.sum() #加法整合
    data.prod() #乘法整合
    data.max() #最大值
    data.mean() #最大值
    data.median() #找到中位數
    data.std()標準差
    data.mlargest(3)取最大三個值
    data.nsmallest(3)取最小三個值
    data = data*2 #放大兩倍
    
    ---------------------------
    字串:
    data.str.lower() #變成小寫
    data.str.upper() #變成大寫
    data.str.len() #得到字串長度
    data.str.cat(sep=",") #用,將每個字串在一起
    data.str.contains("P")#判斷字串是否有大寫P
    data.str.replace("old","new")#取代
        ---------------------------
    #印出dtype 屬性
    print(data.dtype)
    #印出多大
    print(data.size)




### 雙維度 DataFrame 

用來處理結構化(Table like)的資料，有列索引與欄標籤的二維資料集，例如關聯式資料庫、CSV 等等。

  Ex:
  
    import pandas as pd
    data = pd.DataFrame("xxx")
    data["欄位名稱"]
    data.iloc["列編號"]由0累加



### Panel

用來處理有資料及索引、列索引與欄標籤的三維資料集。
