# 新增Views+urls


在應用程式底下新增 templates檔案夾，並把你要顯示的html丟進去。


在`views.py`裡面，定義可以funtion，用於顯示頁面需要參數或是方法

    def home(request):
      title = 'Welcome: This is the Home Page'
      context = {
      "title": title,
      }
      return render(request, "xxxx.html",context)
      
      
在主要接口的`urls.py` 裡新增:

    from (應用程式名) import views

    path('(網域名)', views.home, name='home'),
    
如果要在網頁顯示參數，對應參數名:

    {{title}}
