# 上架Heroku

- 新增'Procfile'檔案:

`web: gunicorn <專案>.wsgi --log-file -`

- 新增`requirements.txt`:

以下是參考:

        asgiref==3.2.10
        Django==3.1.5
        gunicorn==20.0.4
        Pillow==7.2.0
        pytz==2018.9
        whitenoise==4.1.2
        django-utils-six==2.0

在`setting.py`:

    DEBUG = False
    ---------------------------
    ALLOWED_HOSTS = ['<HerokuAppName>.com']
    ---------------------------
    MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    ]
    
    -------------------------------
    STATIC_ROOT = '<appname>/static' ## 因為使用DEBUG = False， 所以在底下加
    STATICFILES_DIRS = [
      os.path.join(BASE_DIR, '/static/'), ##修改地方
    ]

在`urls.py` :

    from django.conf.urls import url

    # 使用靜態資料夾，如果有其他靜態資料夾就用 url(r'^xxxxx/(?P<path>.*)$'
    urlpatterns = [
        url(r'^static/(?P<path>.*)$', static.serve,{'document_root': settings.STATIC_ROOT}, name='static'),
    ]

接下來 :

1 .在Heroku設定好一個專案後，到settings-->  Buildpacks --> Add Buildpack ，
選擇Python。

2 .上傳到Heroku。

3. 設定`heroku config:set DISABLE_COLLECTSTATIC=1`。


之後就成功上架。



