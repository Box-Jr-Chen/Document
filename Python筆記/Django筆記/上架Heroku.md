# 上架Heroku

- 新增'Procfile'檔案:

`web: gunicorn <專案>.wsgi --log-file -`

- 新增`requirements.txt`:

    asgiref==3.2.10
    Django==3.1.5
    gunicorn==20.0.4
    Pillow==7.2.0
    pytz==2018.9
    whitenoise==4.1.2
    django-utils-six==2.0
