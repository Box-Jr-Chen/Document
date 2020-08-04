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

#　Buffered Channel

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

