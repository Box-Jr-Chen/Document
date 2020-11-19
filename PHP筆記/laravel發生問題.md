# laravel發生問題


### require..../vendor/autoload.php错误的解决办法

显然，这是核心都没有拖下来的缘故！
解决办法：

 cd 到该引用的根目录，删除 composer.lock 文件；
 
 重新在根目录执行“composer install”，这样就能重新生成 composer.lock 文件了。

(沒發現檔案，只好直接用下方指令)

如果出现php版本不匹配，可用`composer install --ignore-platform-reqs`（忽略版本匹配）。


### Problem 1 - Installation request for league/flysystem 1.1.3 -> satisfiable by league/flysystem[1.1.3]...


You have disabled the fileinfo extension from php.
To enable extension, verify that are enabled in the .ini file 
(find/add line "extension=fileinfo" in C:\xampp\php\php.ini). 
