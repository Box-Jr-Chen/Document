# Flexbox

第一步要來看 Flexbox 的盒子模型，

flex 的盒子模型如下圖所呈現，與一般的盒子模型不同的地方，

在於 Flexbox 的盒子模型具有水平的起點與終點 ( main start、main end )，

垂直的起點與終點 ( cross start、cross end )，水平軸與垂直軸 ( main axis、cross axis )，

然後元素具有水平尺寸與垂直尺寸 ( main size、cross size )，這些都是相當重要的布局規畫。


![flexbox](./asset/flexbox.jpg)

[W3C_box-model描述](https://www.w3.org/TR/css-flexbox-1/#box-model)

### Flexbox 屬性介紹
 Flexbox的屬性可參考 W3C css3 flexbox css3-flexbox：

    1.display
    
    2.flex-direction
    
    3.justify-content
    
    4.align-items
    
    5.align-self
    
    6.align-content
    
    7.flex-wrap
    
    8.order
    
    9.flex


- display

 display 對於 Flexbox 來說，多了有兩種方式可以設定，預設為「flex」，
 
 其布局方式與 block 幾乎類似，都會強迫換行，

 但設定display:flex的子元素卻具備了更多彈性的設定。

 另外一種方式則是「inline-flex」，和 inline-block 也是幾乎雷同，

 意義上都是一個display:flex的元素外面包覆display:inline的屬性，在後方的元素不會換行。

 CSS：

      .flex,
      .inline-flex{
          width:100px;
          height:50px;
          border:1px solid #000;
      }
      .flex{
          display:flex;
      }
      .inline-flex{
          display:inline-flex;
      }


  ![display](./asset/display.jpg)
