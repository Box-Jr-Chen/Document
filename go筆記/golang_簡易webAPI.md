# golang_簡易webAPI

### golang自带路由
golang自帶路由庫 http.ServerMux ，實際上是一個 map[string]Handler，是請求的url路徑和該url路徑對於的一個處理函數的映射關係。
這個實現比較簡單，有一些缺點：

- 不支持參數設定，例如/user/:uid 這種泛型類型匹配。
- 無法很友好的支持REST模式，無法限制訪問方法（POST，GET等）。
- 也不支持正則。

### gorilla/mux路由
glang自带路由的缺点，gorilla/mux 都具备，而且还兼容 http.ServerMux。
- 支持路径正则。
- 命名路由。
- 还支持中间件等等功能。


以下是Demo 程式碼:

    package main

    import (
      "encoding/json"
      "fmt"
      "log"
      "net/http"

      "github.com/gorilla/mux"
    )

    // go get -v -u github.com/gorilla/mux

    type Article struct {
      Title   string `json:"Title"`
      Desc    string `json:"desc"`
      Content string `json:"Content"`
    }

    type Articles []Article

    func allArticles(w http.ResponseWriter, r *http.Request) {
      articles := Articles{
        Article{Title: "Test Title", Desc: "Test Description", Content: "Hello World"},
        Article{Title: "Test Title2", Desc: "Test Description2", Content: "Hello World2"},
      }

      fmt.Println("Endpoint Hit: All Articles Endpoint")
      json.NewEncoder(w).Encode(articles)
    }

    func testPostArticles(w http.ResponseWriter, r *http.Request) {
      fmt.Fprintf(w, "Test POST endpoint worked")
    }

    func homePage(w http.ResponseWriter, r *http.Request) {
      fmt.Fprintf(w, "Homepage Endpoint Hit")
    }

    func handleRequests() {

      myRouter := mux.NewRouter().StrictSlash(true)

      myRouter.HandleFunc("/", homePage)
      myRouter.HandleFunc("/articles", allArticles).Methods("GET")
      myRouter.HandleFunc("/articles", testPostArticles).Methods("POST")
      log.Fatal(http.ListenAndServe(":8082", myRouter))
    }

    func main() {
      handleRequests()
    }
