# Pandas

### 安裝Pandas

`pip install pandas`

-參考    https://www.youtube.com/channel/UCguZS-y7codLSt6vpkVdnKg
-參考    https://oranwind.org/python-pandas-ji-chu-jiao-xue/
### 單維度 Series

用來處理時間序列相關的資料(如感測器資料等)，主要為建立索引的一維陣列。

  
    import pandas as pd
    data = pd.Series("xxx")
    Ex:
      data = pd.Series([5,4,-2,3,7])
      data = pd.Series([5,4,-2,3,7],index=["a","b","c","d","e"]) ##index 索引
    
    數字:
    data.sum() #加法整合
    data.prod() #乘法整合
    data.max() #最大值
    data.mean() #平均值
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
    print(data.dtype)  #印出dtype 屬性
    print(data.size) #印出多大
    print(data.index)#印出索引
    
   


### 雙維度 DataFrame 

用來處理結構化(Table like)的資料，有列索引與欄標籤的二維資料集，例如關聯式資料庫、CSV 等等。

  Ex:
  
    import pandas as pd
    data = pd.DataFrame("xxx")
    data = pd.DataFrame("xxx",index=索引)

    
    列資料(Row):
    data.iloc["列編號"]由0累加
    data.iloc["列編號", sep="\n"]由0累加
    
    data.loc["索引"]#Series型態
    
    欄資料(Column):
    data["欄位名稱"]
    
    建立新欄位:
    data["欄位名稱"] = 列表資料
    data["欄位名稱"] = Series型態資料
    
    ex:
       data["xxx"] = pd.Series([3,6,1],index=[]) # 如果多維index  所以新增一欄也需要設定index 必須要跟之前的一樣
       
    
        ---------------------------
    print(data.size) #印出多大
    print(data.shape) #印出資料形狀  是二維或三維
    print(data.index)#印出索引
    
    
    EX:
    
    data=pd.DataFrame(
    {
      "name":["Amy","Bob","Charles"],
       "salary":[10000,50000,45000]
    },index=["a","b","c"])
    
    print(data)
    
    --- 
        name     salary
    a   Amy      10000
    b   Bob      50000
    c   Charles  45000



### Panel

用來處理有資料及索引、列索引與欄標籤的三維資料集




###篩選資料

     Ex:
     
     單維:
      import pandas as pd
      data = pd.DataFrame("xxx")
      condition = [True,False,True]  # 基本認識
      condition = data >5  # 資料大於5
      condition = data.str.contains("p")  # 資料包含p
      filteredData = data[condition]
      
     多維: 
      import pandas as pd
      data = pd.DataFrame("xxx")
      condition = [True,False,True]  # 基本認識
      condition = data[欄位名稱] >5  # 資料大於5
      condition = data.str.contains("p")  # 資料包含p
      condition = data["name"]=="Amy"  # 資料中是Amy的
      filteredData = data[condition] >=1000
      filteredData = data[condition]
