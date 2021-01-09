# 新增Views+urls


在應用程式底下新增 templates檔案夾，並把你要顯示的html丟進去。
在`views.py`裡面，定義可以funtion，用於顯示頁面需要參數或是方法

### views 方法

    def home(request):
      title = 'Welcome: This is the Home Page'
      context = {
      "title": title,
      }
      return render(request, "xxxx.html",context)

### 顯示 物件列表

在`views.py`裡面 :

輸入`from .models import *`，把model值丟進去
      
    def list_item(request):
        title = 'List of Items'
        queryset = Stock.objects.all()
        context = {
            "title": title,
            "queryset": queryset,
        }
	return render(request, "list_item.html", context)
      
在主要接口的`urls.py` 裡新增:

    from (應用程式名) import views

    path('(網域名)', views.home, name='home'),
    path('list_item/', views.list_item, name='list_item'),
    
如果要在網頁顯示參數，對應參數名:

    {{title}}

	{% for instance in queryset %}  // for迴圈
	{{instance.item_name}}, {{instance.quantity}}<br>

### 輸入 物件列表

在`views.py`裡面 :

	from django.shortcuts import render, redirect    # redirect導回目的
	from .forms  import StockCreateForm

	def add_items(request):
		form = StockCreateForm(request.POST or None)
		if form.is_valid():
			form.save()
			return redirect('/list_items')  # 導回
		context = {
			"form": form,
			"title": "Add Item",
		}
		return render(request, "add_items.html", context)
		
		
在主要接口的`urls.py` 裡新增:

		path('add_items/', views.add_items, name='add_items'),
		
如果要在網頁顯示參數，對應參數名:

	<form method='POST' action=''>{% csrf_token %}
		{{form}}
        <input type="submit" value='Save'/>
    </form>


### 套用靜態物件

新增 static 資料夾在 應用程式裡面

底下新增css,js,img 等靜態物件

在網頁上開頭新增`{% load static %}`

css 套用:`<link href="{% static 'css/stylesheet.css' %}" rel="stylesheet">`


### 共用物件

如果共用Nav物件
新增navbar.html  ，把Navbar 物件丟進去

在要共用的網頁上 寫上 `{% include 'navbar.html' %}`
