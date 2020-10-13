# MySQLCommand


### 安全模式解除
    //解除
    SET SQL_SAFE_UPDATES=0;
    //回復
    SET SQL_SAFE_UPDATES=1;
    
### 將table的資料全部清除  

    DELETE FROM [database.table];
   
   
### 將單一column內的資料全部清除

    Update [database.table] set [column]=null;


### 新增一個column 在已有的資料表

    ALTER TABLE [database.table] ADD COLUMN [column] int AFTER [old_column];

### 新增外鍵

    https://www.fooish.com/sql/foreign-key-constraint.html
