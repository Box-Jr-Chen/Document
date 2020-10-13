# MySQLCommand


### 安全模式解除
    //解除
    SET SQL_SAFE_UPDATES=0;
    //回復
    SET SQL_SAFE_UPDATES=1;
    
### 將單一column 全部清除

    Update [database.table] set [column]=null;



