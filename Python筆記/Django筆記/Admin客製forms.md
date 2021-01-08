# Admin客製forms

在應用底下新建`forms.py`

    from django import forms
    from .models import (ModelName)

    class (ModelName)CreateForm(forms.ModelForm):
       class Meta:
         model = (ModelName)
         fields = ['category', 'item_name', 'quantity','issue_by']  #對應的model 參數

在`admin.py` 底下:

    from django.contrib import admin
    from .forms import (ModelName)CreateForm
    # Register your models here.
    from .models import (ModelName)
    
    class (Model)CreateAdmin(admin.ModelAdmin):
        list_display = ['category', 'item_name', 'quantity','issue_by']  #列表顯示參數 對應的model 參數 
        form = (ModelName)CreateForm
        list_filter = ['category']    #右側列表過濾器顯示
        search_fields = ['category', 'item_name']  #搜尋列表

        admin.site.register((ModelName),(Model)CreateAdmin)
