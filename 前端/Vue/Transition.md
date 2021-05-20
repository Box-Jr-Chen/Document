# Transition 漸進

- 參考 https://book.vue.tw/CH2/2-5-transitions.html

- CSS檔案

      /* 可以设置不同的进入和离开动画 */
      /* 设置持续时间和动画函数 */
      .slide-fade-enter-active {
          transition: all .4s ease;
        }
        .slide-fade-leave-active {
          transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
          top:30%;
          opacity: 0;
        }

        .Init-enter {
          animation: init 1s;
        }

        @keyframes init {
          from {
              opacity: 0;
              top:30%;
          }
          to {
              opacity: 1;
              top:20%;
          }

        }

 `name` = 動畫名稱，但不適用初始動畫
 `appear-active-class`= 動畫名稱，但適用初始動畫
  `appear ` = 適用初始動畫

-Vue檔

      <transition
      appear-active-class="Init-enter"
      name="slide-fade" 
      appear>
      
      <form v-show="show" >
      </form>
      
      </transition>
      
      
      
 - login.js
  
        export default {
          name:'Login',
          data(){
              return {
                  show: true,
              }
          },
          mounted() {
         },
          methods:{

          }
      }
