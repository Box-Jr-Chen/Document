# SVM講解

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

  靠近線的點為支持向量
  
<img src="SVM_demo_08.png"/>

- 支持向量公式 https://developer.aliyun.com/article/655112


<img src="SVM_demo_09.png"/>
公式:
<img src="SVM_demo_10.png"/>
推導出:
<img src="SVM_demo_11.png"/>
