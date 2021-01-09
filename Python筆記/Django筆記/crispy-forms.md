# crispy-forms

Django-crispy-forms是一個很棒的第三方包，可讓您控制渲染Django表單的方式，而不會破壞默認行為。

`pip install --upgrade django-crispy-forms`


在settings.py新增的 INSTALLED_APPS

`INSTALLED_APPS = (
…
'crispy_forms',
…
)`


在settings.py裡面 `CRISPY_TEMPLATE_PACK = 'bootstrap4'`

在網頁上方 加上`{% load crispy_forms_tags %}`

在表單上 改`{{form|crispy}}`
