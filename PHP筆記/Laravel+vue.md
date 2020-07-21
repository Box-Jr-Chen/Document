# Laravel+vue使用

1.使用composer下載ui套件

     composer require laravel/ui
  
2.ui套件安裝好以後，使用artisan 下載Vue
 
     php artisan ui vue
     
 然後執行:
     
     npm install
     
     npm run dev
     
3.在`resources\views\welcome.blade.php`下修改為:

     <!DOCTYPE html>
     <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
         <head>
             <meta charset="utf-8">
             <meta name="viewport" content="width=device-width, initial-scale=1">

             <title>TMS</title>

             <!-- Fonts -->
             <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

             <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
         </head>
         <body>
             <div id="app"></div>
             <script src="{{ asset('js/app.js') }}"></script>
         </body>
     </html>

 4.在`resources\sass\app.scss`下把所有東西清空。
 
 5.在`resources\js`下把新增app.js，並輸入。
 
     import Vue from 'vue';
     import App from './App.vue';
     import 'bootstrap/dist/css/bootstrap.css';
     import 'bootstrap';
     const app = new Vue({
         el: '#app',
         render: h => h(App)
     });

 
 6.在`resources\js`下把新增App.vue，並輸入。
  
     <template>
         <main>
             <h3>Hello world!</h3>
         </main>
     </template>
     
7.TERMINAL 下執行`npm run watch`。

8.新開TERMINAL並執行`php artisan serve`。

 
[參考網址_laravel](https://laravel.com/docs/7.x/frontend#introduction)   
