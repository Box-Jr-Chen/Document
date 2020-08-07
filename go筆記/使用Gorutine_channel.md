# 使用 Channel

Channel 是 Groutine 間的溝通管道。

Channel 就像是個佇列，可以對它發送值，也可以從它上頭取得值，

要在型態之前加上個 chan，每個 chan 都要宣告可容納的型態。

    package main
    import (
        "fmt"
        "math/rand"
        "time"
    )

    func random(min, max int) int {
        rand.Seed(time.Now().Unix())
        return rand.Intn(max-min) + min
    }

    func tortoise(totalStep int, goal chan string) {
        for step := 1; step <= totalStep; step++ {
            fmt.Printf("烏龜跑了 %d 步...\n", step)
        }
        goal <- "烏龜"
    }

    func hare(totalStep int, goal chan string) {
        flags := [...]bool{true, false}
        step := 0
        for step < totalStep {
            isHareSleep := flags[random(1, 10)%2]
            if isHareSleep {
                fmt.Println("兔子睡著了zzzz")
            } else {
                step += 2
                fmt.Printf("兔子跑了 %d 步...\n", step)
            }
        }
        goal <- "兔子"
    }

    func main() {
        goal := make(chan string)

        totalStep := 10

        go tortoise(totalStep, goal)
        go hare(totalStep, goal)

        fmt.Printf("%s 抵達終點\n", <-goal)
        fmt.Printf("%s 抵達終點\n", <-goal)
    }
    
    
使用 make 建立了一個 Channel，
    
當烏龜或兔子抵達終點時，使用 goal <- 發送一個字串至 Channel 中，
    
而在主流程中，使用 <- goal 從 Channel 取得字串，
    
若 Channel 中無法取得資料，這時會發生阻斷，直到可從 Channel 中取得字串為止。
    
   
使用 goal <- 發送資料至 Channel 時，若 Channel 中已有資料，也會發生阻斷，直到該資料被取走為止。

# 使用　Buffered Channel

    package main

    import "fmt"

    func producer(clerk chan int) {
        fmt.Println("生產者開始生產整數......")
        for product := 1; product <= 10; product++ {
            clerk <- product
            fmt.Printf("生產了 (%d)\n", product)
        }
    }

    func consumer(clerk chan int) {
        fmt.Println("消費者開始消耗整數......")
        for i := 1; i <= 10; i++ {
            fmt.Printf("消費了 (%d)\n", <-clerk)
        }
    }

    func main() {
        clerk := make(chan int, 2)

        go producer(clerk)
        consumer(clerk)
    } 
    
Channel 中預設只能容納一個資料，你可以在建立 Channel 時指定當中可以容納的資料數量。   

在這個程式中，建立的 Channel 的容量為 2，因此在 Channel 的容量未滿前，發送數據至 Channel 並不會發生阻斷。


# close 與 range


    package main
    import (
        "fmt"
        "math/rand"
        "time"
    )
    func random(min, max int) int {
        rand.Seed(time.Now().Unix())
        return rand.Intn(max-min) + min
    }

    func guess(n int, ch chan int) {
        for {
            number := random(1, 10)
            ch <- number
            if number == n {
                close(ch)
            }
            time.Sleep(time.Second)
        }
    }

    func main() {
        ch := make(chan int)

        go guess(5, ch)

        for i := range ch {
            fmt.Println(i)
        }

        fmt.Println("I hit 5....Orz")
    }
    
    
每次猜測的數字，都會使用 ch <- number 傳至 Channel 中，

而最後猜中數字時，使用 close() 關閉 Channel，

Go 的 range 可以搭配 Channel 使用，

在 Channel 尚未關閉前，搭配 for 就可以持續從 Channel 中取出資料。

# select

如果有多個 Channel 需要協調，可以使用 select，

以下來看個多個生產者與一個消費者的例子：

    package main
    import "fmt"
    func producer(clerk chan int) {
        fmt.Println("生產者開始生產整數......")
        for product := 1; product <= 10; product++ {
            clerk <- product
            fmt.Printf("生產了 (%d)\n", product)
        }
    }

    func consumer(clerk1 chan int, clerk2 chan int) {
        fmt.Println("消費者開始消耗整數......")
        for i := 1; i <= 20; i++ {
            select {
            case p1 := <-clerk1:
                fmt.Printf("消費了生產者一的 (%d)\n", p1)
            case p2 := <-clerk2:
                fmt.Printf("消費了生產者二的 (%d)\n", p2)
            }

        }
    }

    func main() {
        clerk1 := make(chan int)
        clerk2 := make(chan int)

        go producer(clerk1)
        go producer(clerk2)

        consumer(clerk1, clerk2)
    }


在 select 的 case 中，

會監看哪個 Channel 可以取得資料（或發送資料至 Channel），
如果都有資料的話，就會隨機選取，

如果都無法取得資料（或發送資料至 Channel）就會發生 panic，
這可以設置 default 來解決，

也就是監看的 Channel 中都沒有資料的話就會執行，

- 利用 select 來做些超時設定。


    package main

    import (
        "fmt"
        "math/rand"
        "time"
    )

    func random(min, max int) int {
        rand.Seed(time.Now().Unix())
        return rand.Intn(max-min) + min
    }

    func producer(clerk chan int) {
        fmt.Println("生產者開始生產整數......")
        for product := 1; product <= 10; product++ {
            time.After(time.Duration(random(1, 5)) * time.Second)
            clerk <- product
            fmt.Printf("生產了 (%d)\n", product)
        }
    }

    func consumer(clerk1 chan int, clerk2 chan int) {
        fmt.Println("消費者開始消耗整數......")
        for i := 1; i <= 20; i++ {
            select {
            case p1 := <-clerk1:
                fmt.Printf("消費了生產者一的 (%d)\n", p1)
            case p2 := <-clerk2:
                fmt.Printf("消費了生產者二的 (%d)\n", p2)
            case <-time.After(3 * time.Second):
                fmt.Printf("消費者抱怨中…XD")
            }

        }
    }

    func main() {
        clerk1 := make(chan int)
        clerk2 := make(chan int)

        go producer(clerk1)
        go producer(clerk2)

        consumer(clerk1, clerk2)
    }
    
如果過了 3 秒鐘，另兩個 Channel 都還是阻斷，`case <- time.After(3 * time.Second)` 該行就會成立 。

- select 中若有相同的 Channel，會隨機選取。

例如底下會顯示哪個結果是不一定的：

    package main

    import "fmt"

    func main() {
        ch := make(chan int, 1)

        ch <- 1
        select {
        case <-ch:
            fmt.Println("隨機任務 1")
        case <-ch:
            fmt.Println("隨機任務 2")
        case <-ch:
            fmt.Println("隨機任務 3")        
        }
    }
    
# 單向 Channel

可以將 Channel 轉為只可發送或只可取值的 Channel。

    package main

    import "fmt"

    func producer(clerk chan<- int) {
        fmt.Println("生產者開始生產整數......")
        for product := 1; product <= 10; product++ {
            clerk <- product
            fmt.Printf("生產了 (%d)\n", product)
        }
    }

    func consumer(clerk <-chan int) {
        fmt.Println("消費者開始消耗整數......")
        for i := 1; i <= 10; i++ {
            fmt.Printf("消費了 (%d)\n", <-clerk)
        }
    }

    func main() {
        clerk := make(chan int, 2)

        go producer(clerk)
        consumer(clerk)
    }  
    
    
`clerk chan<- int` 是只能發送的 Channel，而 `clerk <-chan int` 是只能接收的 Channel，

從一個只能發送的 Channel 接收資料，或者是對一個只能接收的 Channel 發送資料，

都會引發 invalid operation 的錯誤。


 透過 Channel 來作為 Goroutine 間的溝通機制，是 Go 中比較建議的方式，

如果你真的不想要透過 Channel，而想要直接共用某些資料結構，就必須注意有無 Race condition的問題，

若必要，可透過鎖定資源的方式來避免相關問題，有關鎖定的方式，可以參考` sync.Mutex `的使用。
