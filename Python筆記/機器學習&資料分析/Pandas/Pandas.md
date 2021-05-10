# Pandas

### 安裝Pandas

-官網 https://pandas.pydata.org/

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
    data.T #倒置矩陣
    data() # 方差
    
    data.iloc[數字] #找尋值
    data.loc[索引] #找尋值
    
    data.index #索引
    data.values #值
    data.head() #頭
    data.tail() #尾巴
    data.pow(2) #函數計算數據幀和其他逐元素(二進製運算符pow)的指數冪
    
    計算各值的數量: data.value_counts()
    ex
    def count_suffix(li):
        return Series([l.split('.')[-1] for l in li]).value_counts()
    #可以取文件後副檔名的量
    
    
    
    data.astype(np.int8) # 轉變type to int
    data.astype(np.uint8) # 轉變type to uint
    
    
    
    data.isnull()# 返回各值是否為空值
    ex:  
        cond = data.isnull()
        s[cond] # 空值取出
  
    data.notnull()# 返回各值是否不為空值
    ex:  
        cond = data.isnull()
        s[cond] # 空值取出
  
    data.add(10,fill_value=0) #將0的值填入10
    
    
    
    
    data.std()標準差
    data.mlargest(3)取最大三個值
    data.nsmallest(3)取最小三個值
    data = data*2 #放大兩倍
    
    data.name ='xxx' #命名陣列
    
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
    
    data.apply()列資料批量處理
    ==>data.apply(lambda x:x.replace(",", ""))
    
    data.str.extract()正則匹配
     ==>data = data.str.extract(r'(\d+)')  # 匹配數字
 
 
 
 
- 參考 https://www.itread01.com/content/1542566488.html
     
    
   


### 雙維度 DataFrame 

用來處理結構化(Table like)的資料，有列索引與欄標籤的二維資料集，例如關聯式資料庫、CSV 等等。

  Ex:
  
    import pandas as pd
    data = pd.DataFrame("xxx")
    data = pd.DataFrame("xxx",index=索引)
    
    ex:
    data = pd.DataFrame(
                       "Pyton":np.random.randint(0,150,size=5),
                       "Math":np.random.randint(0,150,size=5),
                       "En":np.random.randint(0,150,size=5),   
                       index=list('ABCDE'))
    
    列資料(Row):
    data.iloc["列編號"]由0累加
    data.iloc["列編號", sep="\n"]由0累加
    
    data.loc["索引"]#Series型態
    
    data.to_csv('./data.txt')
    data.to_excel('./data.xlsx')
    
    欄資料(Column):
    data["欄位名稱"]
    
    data.columns  #顯示多少欄位
    
    contb.groupby('xxx') #使用groupby查詢欄位
    
    
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


### 資訊

    pd.describe()


### 篩選資料

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


      data["xxx"]= pd.to_numeric(data["xxx"]) #資料轉換成數字


      切片規則和numpy一樣
      

      
 ex:
 
     df [df ['col1'] =='val1'＆df ['col2'] =='val2']]
     
     
使用`filter` : 

      df.filter(items=["col1","col2"])
      
      df.filter(like="bbi",axis=0)

### 處理缺失值 

-參考 https://blog.csdn.net/dss_dssssd/article/details/82814673

option 1： 去掉含有缺失值的样本（行）

          `DataFrame.dropna()`
          
          `DataFrame.dropna(axis=0, how='any', thresh=None, subset=None, inplace=False)`
        
option 2：将含有缺失值的列（特征向量）去掉

          `DataFrame.drop(labels=None, axis=0, index=None, columns=None, level=None, inplace=False, errors='raise')`

option 3：将缺失值用某些值填充（0，平均值，中值等）

          `DataFrame.fillna(value=None, method=None, axis=None, inplace=False, limit=None, downcast=None, **kwargs)`

### 分類資料

文字轉數字

          sex_mapping = {
                     'male': 1,
                     'female': 0}
            complete_data['Sex1'] = complete_data['Sex'].map(sex_mapping)


是否為空值

          df.isna()


### Pandas 索引
   
   https://ithelp.ithome.com.tw/articles/10194006
   
   
### 將內部相同資料做sum 處理

     # 以"ObservationDate" 為群組整合，並獲得["Confirmed","Active_case","Recovered","Deaths"] 資料 
     # 用sum做"ObservationDate"內相同資料合併起來
     # reset_index 重新排列
     # sort_values 排列  ascending = True從first 開始
    data.groupby(["ObservationDate"])[["Confirmed","Active_case","Recovered","Deaths"]]
      .sum()
      .reset_index()
      .sort_values("ObservationDate",ascending=True)
      .reset_index(drop=True)

### 分析流程

1. 資料收集

2. 清理資料

3. 分析資料

4. 資料的應用
