# Pandas實務



- 如何取得台股日線資料與高頻資料練習 https://www.youtube.com/watch?v=df_zDnFGxmU&list=PLy7MS-q4l3xD8Q_T_J_qIj6cwfOdf-YTs


- pd.readcsv使用

  `pd.read_csv(path)`
  
  `pd.read_csv(io.StringIO(path)`
  
  遇到問題: 
 csv文件默認的是以逗號為分隔符，
 
 但是中文中逗號的使用率很高，
 
 爬取中文數據時就容易造成混淆，
 
 所以使用pandas寫入csv時可以設置參數sep='\t' 或是'\n' 
 
 `pd.read_csv('path',delimiter="\t")` 或者 `pd.read_csv('path',delimiter="\n")`
