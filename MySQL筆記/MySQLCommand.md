# MySQLCommand

### 選擇 方法
    SELECT * from wmt2.tool_location  where xxx1 <> 'nc1' and xxx2 = '0'; 

### 選擇 方法 多重表單
       SELECT
            tool_main.holder,
            tool_type.short,
            tool_maxlife.maxlife
        FROM wmt2.tool_type
        JOIN wmt2.tool_main
          　ON tool_type.type = tool_main.type
        JOIN wmt2.tool_maxlife
            ON tool_type.type = tool_maxlife.type;

### 選擇 方法 多重表單_2
        SELECT
          tool_main.holder,
          tool_type.short,
          tool_maxlife.maxlife
        FROM wmt2.tool_main
        Left JOIN wmt2.tool_type
          ON tool_type.type = tool_main.type
        Left  JOIN wmt2.tool_maxlife
          ON tool_type.type = tool_maxlife.type;

### 選擇 多重選項

        SELECT * FROM   wmt2.tool_main where tool_main.holder=any(SELECT holder FROM wmt2.tool_location where tool_location.pallet='P000001');

### 插入判斷　－　判斷是否有值
    INSERT INTO wmt2.tool_type (short) 
      SELECT 'N10.M3.Z2.K7.L0.60.50.40.30.20.20' FROM DUAL
    WHERE NOT EXISTS 
      (SELECT short FROM wmt2.tool_type WHERE short='N10.M3.Z2.K7.L0.60.50.40.30.20.20')LIMIT 1;
###插入資料

    INSERT INTO wmt2.type_toolholder_shank (code,description)
        values('T1','面銑刀'),('T2','端銑刀'),('T3','鑽頭'),('T4','精密搪刀'),('T5','攻牙刀');
        
### 多重更新 
    UPDATE wmt2.tool_location
    SET  location = CASE WHEN holder = 'th011'     THEN '1'
                         WHEN holder = 'th012'     THEN '3'
                         WHEN holder = 'th013'     THEN '6'
                   END
        ,pallet = 'P000002'
        ,equip = 'wh1'
    WHERE holder IN ('th011','th012','th013');

### 安全模式解除
    //解除
    SET SQL_SAFE_UPDATES=0;
    //回復
    SET SQL_SAFE_UPDATES=1;
    
### 將table的名字做修改
    RENAME TABLE db_a.old_table TO db_b.new_table;
    
### 將table的某個列清除  
    DELETE FROM `wmt2`.`wh_process` WHERE (`ID` = '20210308203336');
### 將table的資料全部清除  

    DELETE FROM [database.table];
   
    //將PK覆規 重新計算
    alter table [database.table] AUTO_INCREMENT=1; 
   
### 將單一column內的資料全部清除

    Update [database.table] set [column]=null;


### 新增一個column 在已有的資料表

    ALTER TABLE [database.table] ADD COLUMN [column] int AFTER [old_column];
    
### 刪除一個column 在已有的資料表    
    ALTER TABLE [database.table] DROP  [column];   
    
### 修改單一column 名字
    ALTER TABLE [database.table] RENAME COLUMN [column_old] TO [column];
    
### 修改單一column 型態
    ALTER TABLE [database.table] MODIFY [column] INTEGER;
### 修改單一column 型態並自動累加
    ALTER TABLE [database.table] MODIFY [column] NOT NULL AUTO_INCREMENT;

### 從別的資料庫裡複製表單
    CREATE TABLE DB2.table SELECT * FROM DB1.table;

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


    ex: (紀錄)
    
    use tms_cloud;
    drop procedure if exists proce_while;
    DELIMITER // 
    create procedure proce_while()
    begin
    declare count int;
    set count = 1;
    while count <= 120 do

    IF count < 10 Then
      insert into tms_cloud.warehouse_cnc (num, cnc_cell, cnc_no, id_toolholder, update_date)  values(count,CONCAT('T0',count),1,null,null);
    ELSEIF count >= 10 and count <= 60   Then
      insert into tms_cloud.warehouse_cnc (num, cnc_cell, cnc_no, id_toolholder, update_date)  values(count,CONCAT('T',count),1,null,null);
    ELSEIF  count > 60 and  count < 70 Then
      insert into tms_cloud.warehouse_cnc (num, cnc_cell, cnc_no, id_toolholder, update_date)  values(count,CONCAT('T0',count-60),2,null,null);
    ELSEIF count >= 70 Then
      insert into tms_cloud.warehouse_cnc (num, cnc_cell, cnc_no, id_toolholder, update_date)  values(count,CONCAT('T',count-60),2,null,null);

    END IF;  
    set count = count + 1;
    end while;
    end//

    call proce_while();


### 參考
    https://www.itread01.com/content/1543626440.html
    https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/186028/
