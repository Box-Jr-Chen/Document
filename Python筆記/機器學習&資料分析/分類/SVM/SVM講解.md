# SVM講解

- 官網 https://scikit-learn.org/stable/modules/svm.html#svm-classification


SVM (Support Vector Machine) 向量分類器 

- 向量機

- 主要針對小樣本數據

- 非線性

- 高為模式識別 

簡單例子:

  1.將下列分類

<img src="SVM_demo_01.png"/>

  2.以下不一定好

<img src="SVM_demo_02.png"/>


<img src="SVM_demo_03.png"/>

  3.找到分際線附近的點
 
<img src="SVM_demo_04.png"/>


複雜例子:

  1.將下列分類

<img src="SVM_demo_05.png"/>

  2.將二維變成高維 ，因為屬性不同， 高度也就不同

<img src="SVM_demo_06.png"/>

  3.平面看到的樣子
 
<img src="SVM_demo_07.png"/>

- SVM 分切3D圖 https://www.youtube.com/watch?v=OdlNM96sHio

   名詞: 
   
   1.球 等於data
   
   2.棍子 等於classifier
   
   3.最大間隙trick  叫做 optimization

   4.拍桌子叫 Kernelling

   5.那張紙叫 hyperplane 

   
### 支持向量

  - 靠近線的點為支持向量。
  
  - 分離超平面0 兩類點，其中一類在上面，另一類就在下面。
  
<img src="SVM_demo_08.png"/>

- 支持向量公式 https://developer.aliyun.com/article/655112





<img src="SVM_demo_09.png"/>
公式:
<img src="SVM_demo_10.png"/>
推導出:
<img src="SVM_demo_11.png"/>


### 拉格朗日程子法


- https://www.youtube.com/watch?v=Es8Ybz501bo&list=PLwDQt7s1o9J65aQ6HYN4LaqRkX8ncKG1D&index=105&t=10m


### 結論

 - SVC 線性劃分 

    wx+b = 0  分類器 
    
    wx+b = 1  上邊界 
    
    wx+b =-1  下邊界 

    邊界上的點 就是支持向量
    
    其餘所有的點帶入方城，大於1 或是小於-1
    
    絕對值越大說明分的越開

  
   - SVC 非線性劃分 :
            一三象限一類點
            二四象限一類點
            線性不可分的一三象限點，從屏幕長出來
            二四象限點凹進去
            屏幕相當於'分離超平面'
            
   - SVC 回歸 :
          a.線性
          b.多項式
          c.徑向基 rbf 高斯核
          d.預測數據範圍不是無限預測
          
   - SVC 實現人臉識別 :    
          PCA降維，數據屬性變少，
