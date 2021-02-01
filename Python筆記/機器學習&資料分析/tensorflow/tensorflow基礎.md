# tensorflow基礎


- 設定矩陣

`constant`:

    #3x2
    a = tf.constant(np.random.randint(0,10,size = (3,2)),dtype=tf.float32) 
    
    #2x4
    b = tf.constant(np.random.randint(0,10,size = (2,4)),dtype=np.float32)
 
- 矩陣乘法

`matmul`:

    c = tf.matmul(a,b)
