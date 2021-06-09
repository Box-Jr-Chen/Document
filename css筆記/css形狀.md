# css形狀

- 參考 https://css-tricks.com/the-shapes-of-css/

- 圓形

      #circle {
        width: 100px;
        height: 100px;
        background: red;
        border-radius: 50%
      }
- 三角形

      #triangle-up {
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid red;
      }
      
      #triangle-left {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-right: 100px solid red;
        border-bottom: 50px solid transparent;
      }
      
      #triangle-right {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-left: 100px solid red;
        border-bottom: 50px solid transparent;
      }
    
- 十字架

      #cross {
          width: 6rem;
          height: 6rem;
          position: absolute;

          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
       }

       #cross:before, #cross:after {
         content: "";
         position: absolute;
         z-index: -1;
         background: rgb(211, 211, 211);
       }

       #cross:before {
         left: 50%;
         width: 30%;
         margin-left: -15%;
         height: 100%;
       }

       #cross:after {
         top: 50%;
         height: 30%;
         margin-top: -15%;
         width: 100%;
       }
       
 - 放大鏡
 
        #magnifying-glass {
            font-size: 10em;
            display: inline-block;
            width: 0.4em;
            box-sizing: content-box;
            height: 0.4em;
            border: 0.1em solid red;
            position: relative;
            border-radius: 0.35em;
          }
          
          #magnifying-glass:before {
            content: "";
            display: inline-block;
            position: absolute;
            right: -0.25em;
            bottom: -0.1em;
            border-width: 0;
            background: red;
            width: 0.35em;
            height: 0.08em;
            transform: rotate(45deg);
          }
  
   - 鎖頭

          #lock {
            font-size: 8px;
            position: relative;
            width: 18em;
            height: 13em;
            border-radius: 2em;
            top: 10em;
            box-sizing: border-box;
            border: 3.5em solid red;
            border-right-width: 7.5em;
            border-left-width: 7.5em;
            margin: 0 0 6rem 0;
          }
          #lock:before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            border: 2.5em solid red;
            width: 14em;
            height: 12em;
            left: 50%;
            margin-left: -7em;
            top: -12em;
            border-top-left-radius: 7em;
            border-top-right-radius: 7em;
          }
          #lock:after {
            content: "";
            box-sizing: border-box;
            position: absolute;
            border: 1em solid red;
            width: 5em;
            height: 8em;
            border-radius: 2.5em;
            left: 50%;
            top: -1em;
            margin-left: -2.5em;
          }
