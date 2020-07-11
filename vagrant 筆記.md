# Vagrant 筆記

### Vagrant 指令
vagrant init xxx/xxx  可初始化簡單的範本 ，並設定需要的box，目前使用("generic/ubuntu1804")

vagrant up 啟動虛擬機 在vagrant cloud 下載box

vagrant halt 關閉虛擬機

vagrant destroy 刪除虛擬環境

vagrant ssh 登入虛擬環境
  - 再按下exit 離開虛擬環境

### Vagrantfile

目前遇到狀況，vagrant init 以後先不進行修改，執行vagrant up 先啟動虛擬機並執行環境，之後在修改Vagrantfile 

    mysql> SELECT table_name, table_type, engine
        -> FROM information_schema.tables
        -> WHERE table_schema = 'wizard'
        -> ORDER BY table_name;
    +----------------------+------------+---------+
    | table_name           | table_type | engine  |
    +----------------------+------------+---------+
    | migrations           | BASE TABLE | InnoDB  |
    | notifications        | BASE TABLE | InnoDB  |
    | wz_attachments       | BASE TABLE | InnoDB  |
    | wz_categories        | BASE TABLE | InnoDB  |
    | wz_comments          | BASE TABLE | InnoDB  |
    | wz_groups            | BASE TABLE | InnoDB  |
    | wz_operation_logs    | BASE TABLE | ARCHIVE |
    | wz_pages             | BASE TABLE | InnoDB  |
    | wz_page_histories    | BASE TABLE | InnoDB  |
    | wz_page_share        | BASE TABLE | InnoDB  |
    | wz_page_tag          | BASE TABLE | InnoDB  |
    | wz_password_resets   | BASE TABLE | InnoDB  |
    | wz_projects          | BASE TABLE | InnoDB  |
    | wz_project_catalogs  | BASE TABLE | InnoDB  |
    | wz_project_group_ref | BASE TABLE | InnoDB  |
    | wz_project_stars     | BASE TABLE | InnoDB  |
    | wz_tags              | BASE TABLE | InnoDB  |
    | wz_templates         | BASE TABLE | InnoDB  |
    | wz_users             | BASE TABLE | InnoDB  |
    | wz_user_group_ref    | BASE TABLE | InnoDB  |
    +----------------------+------------+---------+
    20 rows in set (0.00 sec)
