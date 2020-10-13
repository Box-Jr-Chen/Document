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

### 修改單一column 型態
    ALTER TABLE [database.table] MODIFY [column] INTEGER;

### 新增外鍵

    https://www.fooish.com/sql/foreign-key-constraint.html

### 新增程序

    use [database];  //先確定哪一個資料庫
    drop procedure if exists proce_while;
    DELIMITER // 
    create procedure proce_while()
    begin
    declare count int;
    set count = 0;
    while count < 5 do
    insert into [table] (x, x, x, x, x)  values(count,CONCAT('T',count),x,x,x);
    set count = count + 1;
    end while;
    end//

    call proce_while();
