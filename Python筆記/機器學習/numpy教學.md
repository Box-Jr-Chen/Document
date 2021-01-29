# numpy(numeric python)教學

<img src="numpy.png" width="400">



`import numpy as np`

-版本  `np.__version__`

- 矩陣:

    =>
    
      l =[1,2,3,4,5]
      type(l)
      
      nd=np.array(l)
      
      #np.array 與 python矩陣不同處就是可以用np的方法計算 
      
      
    =>
      
      np.array(0,10000,1)
      
      
    =>
    
      np.ones(shape=(5,5),dtype=np.int8)
            
    =>
    
      np.ones(shape=(5,5,4),dtype=float16) #  三維
      
    =>
    
      np.full(shape=(3,4),fill_value=3.14) #全部都是fill_value
      
    =>
    
      np.eye(N=5) #對角線都是1  
      
      exprot :[[1,0,0,0,0],
               [0,1,0,0,0], 
               [0,0,1,0,0],
               [0,0,0,1,0],
               [0,0,0,0,1],]
               
               
               
      
 - 求和:`np.sum()`
 
 - 求方差:`np.var()`
 
