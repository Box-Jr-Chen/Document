# RESTful 設計

### API 是什麼?

- Application Programming Interface (應用程式介面)

   簡單來說，是品牌開發出的一種接口，讓第三方可以額外開發、應用在自身的產品上的系統溝通介面。
   
- HTTP

   Hypertext Transfer Protocol（超文本傳輸協定），
   
   網路世界其實就分為客戶端、伺服器端，
   
   舉例說，客戶端就是我，
   
   伺服器端就是 Yahoo，
   
   我要看 Yahoo 的首頁，我就是向 Yahoo 的伺服器端傳送了這個要求，
   
   Yahoo 再回應資源給我。
   
   為了讓要求和回應統一規範，就有了 HTTP。
   
   status code狀態碼又會再分為下幾種：
   
      2xx = Success（成功）
      3xx = Redirect（重定向）
      4xx = User error（客戶端錯誤）
      5xx = Server error（伺服器端錯誤）

   在 HTTP 中，會有很多種 method 做為請求的方法，
   
   常用的幾個動作分別為：GET / POST / PUT / DELETE，
   
   正好會對應到資料庫基本操作 CRUD 增刪查改。

### RESTful 模式

   Representational State Transfer( 表現層狀態轉移)

   他是一種設計風格，一個架構符合 REST 原則，就稱它為 RESTful 架構。

   RESTful API 主要由三種元件組成：

   1.Nouns 名詞：定義資源位置的 URL，每個資源在網路上都會有唯一的位置，就如每戶人家都有唯一的地址一樣。

   2.Verbs 動詞：對資源要做的動作。

   3.Content Types 資源呈現方式：API 資源可以以多種方式表現，最常用的是 JSON，較輕，也較好處理。
   
   舊設計風格 :

      /getAllUsers
      /getUser/1
      /createUser
      /updateUser/1
      /deleteUser/1   

   RESTful 設計風格:

      GET /users
      GET /users/1
      POST /users
      PUT /users/1
      DELETE /users/1

   以RESTful API 風格開發的話，就是用一個唯一的 URL 定位資源，將動作藏在 HTTP 的 method 裡面。
    
    
  - 操作一般 Resource 時，URL 使用複數名詞。 
   
        /v1.0/user/1 (X)
    
        /v1.0/users/1 (O)
    
  - 操作唯一 Resource 時，URL 使用單數名詞。

    對 Client 而言，只有一份的資源時用單數名詞。
    
    例如 GitHub watching API 中的 GET /user/subscriptions，
    
    其中 user 是指目前驗證的使用者，所以用單數。
    
   - 如果某些動作是 HTTP 動詞表示不了的，你就應該把動作做成一種資源。

    POST /accounts/1/transfer/500/to/2
    
   換成

    POST /transaction HTTP/1.1
    
    Host: 127.0.0.1

    from=1&to=2&amount=500.00
    
       
   - 如果 API 有多個 table 的關聯
    
     把它當成獨立的 Resource
   
   - 操作非 Resource (Utility API)時，使用動詞。
   
    GET /translate?from=de_DE&to=en_US&text=Hallo
    
    GET /calculate?para2=23&para2=432
    
   - 使用 sub-resources
    
    get /users/1/albums/1
    
   - 盡量不要用縮寫，除非它是普羅大眾都知道的縮寫。
   
### Query 參數  

沒有特別規定，可以底線分隔或使用駝峰命名，須保持一致風格。

但建議使用駝峰命名，符合大部分程式語言的 code style。

以 path 參數傳送必要資訊，query 參數傳送選擇性資料。

    get /search/users/nickname/alin (X)
    
    get /search/users?nickname=alin (O)

Filtering

    GET /tickets?level=vip
    
排序 (Sorting)

    GET /tickets?sort=-priority,created_at

Field selection

    GET /tickets?fields=id,subject,customer_name,updated_at

分頁 (Paging)

    /v1.0/users?limit=25&offset=50

CRUD 範例

      Resource URI	意義
      get /users	取得所有使用者資料
      get /users/1	取得使用者 ID 是 1 的資料
      post /users	批次新增
      post /users/1	單筆新增
      put /users	批次更新
      put /users/1	更新單筆全部內容
      patch /users/1	更新單筆部分內容
      delete /users	批次刪除
      delete /users/1	單筆刪除
      get /users/1/albums/1	取得 userId=1 的第一本相簿資料
  
### 使用 RESTful 風格設計的 API，就有了以下幾種優點及限制：
   
   1. 有唯一的URL表示資源位置，統一的 API 接口。(Uniform Interface)

   2. 無狀態。(Stateless) 
   
   -- 一般 Web 服務中，Server 端和 Client 端交互的資訊，
       
   會存在 Server 端的 Session (例如：已登入狀態)，在 Client 端再次發送請求的時候，
       
   Server 端透過保存在 Server 端的 Session，去執行 request。
        
   -- 狀態的意思，即 Client 端自行保存狀態，
     
   在請求 Server 的時候，一併附上給 Server 端，
        
   Server 端無保存 Client 端的狀態資訊。 
       
   舉一個白話一點的例子：查詢員工工資：
       
   第一步：登錄系統。
       
   第二步：進入查詢工資的頁面。
       
   第三步：搜索該員工。
       
   第四步：點擊姓名查看工資。
       
   這樣的操作流程就是有狀態的，查詢工資的每一個步驟都依賴於前一個步驟，只要前置操作不成功，後續操作就無法執行。
       
   如果輸入一個URL就可以直接得到指定員工的工資，
       
   這種情況就是無狀態的，因為獲取工資不依賴於其他資源或狀態，
       
   這種情況下，員工工資是一個資源，
       
   由一個 URL 與之對應可以通過 HTTP 中的 GET 方法得到資源，這就是典型的 RESTful 風格。
       
   3. 可更高效利用快取來提高回應速度 (Cachable)
   
   在 client-side，透過 client 端 cache 紀錄 chahe 版本，
       
   若向 server 要求資源時發現 server 最新版與 cache 相同，
       
   則 client 端直接取用本地資源即可，不需要再做一次查詢
   
   4. 分層系統架構 (Layered System)
   
   5. 客戶端服務器分離 (Client-Server)

   6. 充份利用 HTTP protocal(GET/POST/PUT/DELETE) (Manipulation of resources through representations)

   7. 可執行程式碼的設計，像是 JavaScript（非必要實作項目） Code-On-Demand (optional)
   
   

[參考網址](https://charder.readbook.tw/api-design/restful/)

[參考網址-2](https://medium.com/itsems-frontend/api-%E6%98%AF%E4%BB%80%E9%BA%BC-restful-api-%E5%8F%88%E6%98%AF%E4%BB%80%E9%BA%BC-a001a85ab638)
