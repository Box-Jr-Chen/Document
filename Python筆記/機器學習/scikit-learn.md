#　scikit-learn套件

# 安裝

指令：
`pip install scikit-learn`

# 範例
    import numpy as np
    import pandas as pd

    from sklearn.neighbors import KNeighborsClassifier


    movie =pd.read_excel('movies.xlsx',sheet_name=1)
    X = movie[['武打镜头','接吻镜头']]#數據
    Y = movie['分类情况']#目標值
    knn = KNeighborsClassifier(n_neighbors=5)＃抓取五個鄰居
    knn.fit(X,Y)    #該方法為訓練數據
    
    #預測新電影
    #碟中蝶6 100,3
    #戰郎2 200,1
    #xxx之戀 0,10
    X_test = pd.DataFrame({'武打镜头':[100,200,0],'接吻镜头':[3,1,10]})

    knn.predict(X_test)　＃預測
    knn.predict_proba(X_test)＃比例
    
