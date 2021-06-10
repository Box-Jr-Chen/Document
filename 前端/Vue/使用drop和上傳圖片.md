 # 使用drop和上傳圖片      
       
  - Vue File
  
   原始碼(使用label 在用input  可以讓display:none):
   
       <label class="drop-zone"  @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="UploadImg_drop(i, $event)">
       
             <span class="drop-zone__prompt" style="  
                   -webkit-user-select: none; 
                   -moz-user-select: none;     
                   -ms-user-select: none;     
                   user-select: none; " v-if="ImgView_cache ==null">
                   
                   拖曳或點擊上傳
                   
             </span>
             <input type="file" name="myFile" class="drop-zone__input" @change="UploadImg">              
             <img v-if="ImgView_cache !=null" :src="ImgView_cache.URL" alt="">
            
       </label>

- JS

   原始碼:
   
       methods: {
            UploadImg:function(event){
               const file = event.target.files[0];
               var CachePath = URL.createObjectURL(file);
                  var photo ={
                       "URL" : CachePath,
                       "Data": file,
                       "IsMain": 0,
                       "Add":    1
                  };
               this.ImgView_cache = photo;
             },
             checkDrop(e){
               e
            },
            dragEnter(e){
               e
            },
            dragleave(e){
               e
            },
            dragend(e){
               e
            },
            UploadImg_drop:function(i,event){
               event.preventDefault();
               const file = event.dataTransfer.files[0];
               var CachePath = URL.createObjectURL(file);
                  var photo ={
                       "URL" : CachePath,
                       "Data": file,
                       "IsMain": 0,
                       "Add":    1
                  };

               this.ImgView_cache = photo;
            }
          }


- CSS

   原始碼:
   
      .drop-zone {

          width: 15rem;
          height: 15rem;
          border-width: 2px;
          position: absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);


          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: "Quicksand", sans-serif;
          font-weight: 500;
          font-size: 20px;
          cursor: pointer;
          color: #818181;
          border: 2px dashed #009578;
          border-radius: 5px;
        }
        .drop-zone:active{
            background: rgb(189, 189, 189);
        }

        .drop-zone img{
          width: 95%;
          height: 95%;
        }
        .drop-zone--over {
          border-style: solid;
        }

        .drop-zone__input {
          display: none;
          width: 100%;
          height: 100%;
        }

        .drop-zone__thumb {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
          background-color: #cccccc;
          background-size: cover;
          position: relative;
        }

        .drop-zone__thumb::after {
          content: attr(data-label);
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 5px 0;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.75);
          font-size: 14px;
          text-align: center;
        }
  
