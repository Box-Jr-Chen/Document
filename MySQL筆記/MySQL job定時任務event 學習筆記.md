# 定時任務event 學習筆記

參考  https://www.itread01.com/content/1544748848.html


- MySQL的定時任務（簡稱job）是可以通過MySQL自身實現的，

MySQL自身job可以實現秒級定位，即可以精確到秒單位進行任務的執行（系統計劃任務一般是分鐘），

MySQL 的job官方稱為event，MySQL EVENT的原理和觸發器非常的相似，

區別在於，MySQL的event是系統定時驅動執行，而觸發器是通過需求觸發進行執行的，兩者各有優勢。

- 在建立job之前，需要做以下幾件事：

  1、確保系統的event事件開關是開啟的，允許我們建立event；

  2、確保我們建立後是在成功執行的，所以要會檢視當前系統有的event

  3、確保我們建立是按照需求來的，如果需要更改，我們要會更改event

### 檢視系統開關

-- 方法一
select @@event_scheduler;

--方法二
show variables like 'event_scheduler';

### 語法

建立語法 :

        CREATE 
            [DEFINER = { user | CURRENT_USER }] --一般不寫
            EVENT --event標識
            [IF NOT EXISTS] --如果沒有就新建，建議不寫這一行，確保每個event獨立不衝突
            event_name -- 取個event名字
            ON SCHEDULE --計劃任務標識
            schedule --計劃任務時間，有兩個引數（at 和 every），at代表當前一次，every表示每過多少時間執行一次
            [ON COMPLETION [NOT] PRESERVE] --可以不寫，預設是ON COMPLETION NOT PRESERVE 即計劃任務執行完畢後自動drop該事件；ON COMPLETION  PRESERVE則不會drop
            [ENABLE | DISABLE | DISABLE ON SLAVE] --可以不寫，預設狀態，預設是啟用狀態，可以指定為新建關閉狀態 
            [COMMENT 'comment'] --註釋event，可以不寫
            DO --執行語句標識
            event_body; --執行的sql

計劃任務可以定義的時間方式：

        schedule: 
            AT timestamp [+ INTERVAL interval] ... --at方式
          | EVERY interval                         --every方式
            [STARTS timestamp [+ INTERVAL interval] ...] --在at/every後可以指定什麼時候開始
            [ENDS timestamp [+ INTERVAL interval] ...]  --指定什麼時候結束

MySQL官方提供的時間字元，可以參考:

        interval: 
            quantity {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE | 
                      WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE | 
                      DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND} 
