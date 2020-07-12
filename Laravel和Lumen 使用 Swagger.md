# Laravel和Lumen 使用 Swagger

### 下載新的專案樣板

    composer create-project laravel/laravel demo
    
1.進入 demo專案下載L5-Swagger，我們Laravel版本7以上，所以使用7版本以上。
可到L5-Swagger github上查看版本  https://github.com/DarkaOnLine/L5-Swagger

    composer require "darkaonline/l5-swagger:7.*"
    
    
2.下載zircote/swagger，我下載2.0版本。

    composer require zircote/swagger-php:2.*
    
3.設定vendor:

    php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
    
4.編輯.env 底下加入:

    L5_SWAGGER_GENERATE_ALWAYS=true
    SWAGGER_VERSION=2.0
    
    L5_SWAGGER_CONST_HOST=localhost:8000 (看你的port多少)
    
    
5.新建controller測試:

    php artisan make:controller xxxController
    
寫入註釋測試
```php
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
 
class TestController extends Controller
{
    /**
     * @SWG\Get(
     *   path="/api/testing/{mytest}",
     *   summary="Get Testing",
     *   operationId="testing",
     *   @SWG\Response(response=200, description="successful operation"),
     *   @SWG\Response(response=406, description="not acceptable"),
     *   @SWG\Response(response=500, description="internal server error"),
	 *		@SWG\Parameter(
     *          name="mytest",
     *          in="path",
     *          required=true, 
     *          type="string" 
     *      ),
     * )
     *
     */
	public function index(Request $request){
		echo $request->mytest;
	}
}
```
