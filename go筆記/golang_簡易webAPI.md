# golang_簡易webAPI

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
