# 連結資料庫

- 安裝:

    1.指令`pip install pymysql`
    
    
      import numpy as np

      import pandas as pd
      from pandas import Series,DataFrame

      import pymysql
      
      
      # 資料庫連接
      con = pymysql.Connection(host='127.0.0.1',port = 3306,user ='root',password='root',database='',charset='utf8')
      
      #指令
      sql = 'select * from shu'
      
      # 讀取數據
      df = pd.read_sql(sql,con)
      
      # 保存數據
      df.to_sql('table',con) #不能使用這種方法
      
      先安裝:
      
      pip install mysqlclient
      
      pip install sqlalchemy
      
      
      from sqlalchemy import create_engine
      
      engine = create_engine('mysql+pymysql://用戶名:密碼@localhost:3306/資料庫?charset=utf8')
      engine
      df.to_sql('table',engine) #會自動新增table
