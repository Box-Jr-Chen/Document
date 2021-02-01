# Pandas實務



- 如何取得台股日線資料與高頻資料練習 https://www.youtube.com/watch?v=df_zDnFGxmU&list=PLy7MS-q4l3xD8Q_T_J_qIj6cwfOdf-YTs


- pd.readcsv使用

  `pd.read_csv(path)`
  
  `pd.read_csv(io.StringIO(path)`
  
  遇到問題: 
  
   csv文件默認的是以逗號為分隔符，建議讀取的文件單一個都要"xxxx"


# 範例 

    import requests
    import pandas as pd
    import csv
    import datetime
    import time
    import io
    import glob
    import sqlite3
    import matplotlib.pyplot as plt
    import numpy as np
    
    # R.O.C台灣證券營行
    def crawler(date_time):
        page_url = 'https://www.twse.com.tw/exchangeReport/MI_INDEX?response=csv&date='+ date_time +'&type=ALLBUT0999'
        page = requests.get(page_url)
        use_text = page.text.splitlines()
        for i,text in enumerate(use_text):
            if str(text).find("證券代號") >0:
                initital_point = i
                break

        test_df = pd.read_csv(io.StringIO(''.join([text[:-1] + '\n' for text in use_text[initital_point:]])))
        test_df['證券代號'] =  test_df['證券代號'].apply(lambda x:x.replace('"',''))
        test_df['證券代號'] =  test_df['證券代號'].apply(lambda x:x.replace('=',''))
        return test_df
       
     # R.O.C台灣證券用CSV讀取  
    def crawler_csv(path):
        rows=[]
        with open(url, newline='') as csvfile:

          # 讀取 CSV 檔案內容
          file = csv.reader(csvfile)

          for row in file:
              rows.append(row)  

        for i,row in enumerate(rows):
            if str(row).find("證券代號") >0:
                initital_point = i
                break

        csv2_file =''

        for i in range(initital_point,len(rows)):
            data = pd.Series(rows[i])
            for j in range(0,len(data)-1):
                     data[j] = "\""+data[j]+"\""

            line = data.str.cat(sep=",")+"\n"
            line = line.replace(",\n","\n")

            csv2_file = csv2_file + line

        test_df = pd.read_csv(io.StringIO(csv2_file));
        test_df['證券代號'] =  test_df['證券代號'].apply(lambda x:x.replace('"',''))
        test_df['證券代號'] =  test_df['證券代號'].apply(lambda x:x.replace('=',''))
    return test_df   
       
    # 時間格式轉換
    def trans_date(datetime):
        return ''.join(str(datetime).split(' ')[0].split('-'))
    
    # 抓取設定時間的往前幾天
    def parse_n_days(start_date,n):
        df_dict={}
        now_date = start_date
        for i in range(n):
            time.sleep(3)
            now_date = now_date - datetime.timedelta(days=1)
            try:
                df = crawler(trans_date(now_date))
                print('Successful!'+' ' + trans_date(now_date))
                df_dict.update({trans_date(now_date):df})
            except:
                print('Fails at'+' '+ trans_date(now_date) )
        return df_dict

    #抓取12天
    result_dict = parse_n_days(datetime.datetime.now(),12)
    result_dict.keys()
    for key in result_dict.keys():
        result_dict[key].to_csv(str(key)+'.csv')
        
    #連結資料庫 
    db = sqlite3.connect('TWStock.db')    
    #存入資料庫
    for file_name in all_csv_file:
      pd.read_csv(file_name).iloc[:,1:].to_sql(file_name.replace('.csv',''),db,if_exists='replace')
    #透過CSV擷取名稱  
    dates_list = [file_name.replace('.csv','') for file_name in all_csv_file]
    
    #連結資料庫 2 轉換以證券代號儲存
    db2 = sqlite3.connect('TWStock2.db')
    total_dict = dict(tuple(total_df.groupby('證券代號')))
    for key in total_dict.keys():
      df = total_dict[key].iloc[:,2:]
      df['Date'] = pd.to_datetime(df['Date'])
      df = df.sort_values(by=['Date'])
      df.to_sql(key,db2,if_exists='replace')
    
    #存取台積電資料
    stocks_dict={}

    stocks_dict.update({'tsmc':pd.read_sql(con=db3,sql='SELECT * FROM "2330"')})
    
    #保留收盤價與證券名稱
    for key in stocks_dict.keys():
       df = stocks_dict[key]
       df.index = df['Date']
       df.index =pd.to_datetime(df.index)
       df = df[['證券名稱','收盤價']]
       df['收盤價'] = pd.to_numeric(df['收盤價'].apply(lambda x:x.replace(',','')),errors='coerce')
       df.columns =['stock_code','close']
       stocks_dict[key] = df
     
    #繪製取線圖
    fig,ax = plt.subplots(3,2,figsize=(10,10))
      plt.subplots_adjust(hspace=0.8)
      stocks_dict['tsmc']['2021-01-11':].plot(ax=ax[0,0])
      fig.suptitle('stock price via time')
      plt.show()
  
    #從收盤價繪製點點陣圖   
    df = stocks_dict['tsmc'].copy()
      df_p = df['2021-01-11':].iloc[:-1,:]
      df_a = df['2021-01-11':].iloc[1:,:]
      plt.scatter(np.array(df_p['close']),np.array(df_a['close']))
      plt.show()
      #長柄圖  
      plt.hist([np.array(df['2021-01-11':'2021-01-15']['close']),np.array(df['2021-01-11':]['close'])])  
