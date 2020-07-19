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

### RESTful

Representational State Transfer( 表現層狀態轉移)

他是一種設計風格，一個架構符合 REST 原則，就稱它為 RESTful 架構。

RESTful API 主要由三種元件組成：

1.Nouns 名詞：定義資源位置的 URL，每個資源在網路上都會有唯一的位置，就如每戶人家都有唯一的地址一樣。

2.Verbs 動詞：對資源要做的動作。

3.Content Types 資源呈現方式：API 資源可以以多種方式表現，最常用的是 JSON，較輕，也較好處理。

[參考網址](https://charder.readbook.tw/api-design/restful/)
[參考網址-2](https://medium.com/itsems-frontend/api-%E6%98%AF%E4%BB%80%E9%BA%BC-restful-api-%E5%8F%88%E6%98%AF%E4%BB%80%E9%BA%BC-a001a85ab638)
