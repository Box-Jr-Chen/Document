# 使用MySQL

確認MySQL安裝確定，

安裝 `pip install mysqlclient`


把DATABASES 的設定改為:

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'stockmgmt',
            'USER': 'myusername',
            'PASSWORD': 'myPassword',
        }
    }
    
刪除之前的migrations裡的.py，保留`__init__.py`

執行`python manage.py migrate` 新增table，
執行`python manage.py makemigrations` ，再執行`python manage.py migrate`

成功以後，如果要admin 新增使用者，執行`python manage.py createsuperuser`
