             <label class="drop-zone"  @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="UploadImg_drop(i, $event)">
                                         <span class="drop-zone__prompt" style="  
                                         -webkit-user-select: none; 
                                         -moz-user-select: none;     
                                         -ms-user-select: none;     
                                         user-select: none; " v-if="ImgView_cache ==null">拖曳或點擊上傳</span>
                                         <input type="file" name="myFile" class="drop-zone__input" @change="UploadImg">
                                         
                                         <img v-if="ImgView_cache !=null" :src="ImgView_cache.URL" alt="">
             </label>
