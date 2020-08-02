# Gorutine 和 sync.WaitGroup

在函式使用 go 來使用 Gorutine

### Gorutine

goroutine是Go運行時管理的輕量級線程。

-範例
 烏龜賽跑
 
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

    func tortoise(totalStep int) {
        for step := 1; step <= totalStep; step++ {
            fmt.Printf("烏龜跑了 %d 步...\n", step)
        }
    }

    func hare(totalStep int) {
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
    }

    func main() {
        totalStep := 10

        go tortoise(totalStep)
        go hare(totalStep)

        time.Sleep(5 * time.Second) // 給予時間等待 Goroutine 完成
    }
 
程式的最後使用 time.Sleep() 讓主流程沉睡了五秒鐘，

這是因為主流程一結束，所有的 Goroutine 就會停止。

### sync.WaitGroup

實際上沒有任何方法可以得知Goroutine 執行結束，

除非你主動設計一種機制，可以在 Goroutine 結束時執行通知。

Channel 是一種方式，另一種是 sync.WaitGroup。


sync.WaitGroup 可以用來等待一組 Goroutine 的完成，

主流程中建立 sync.WaitGroup，並透過 Add 告知要等待的 Goroutine 數量，

並使用 Wait 等待 Goroutine 結束，而每個 Goroutine 結束前，必須執行 sync.WaitGroup 的 Done 方法。

package main

    import (
        "fmt"
        "math/rand"
        "sync"
        "time"
    )

    func random(min, max int) int {
        rand.Seed(time.Now().Unix())
        return rand.Intn(max-min) + min
    }

    func tortoise(totalStep int, wg *sync.WaitGroup) {
        defer wg.Done()

        for step := 1; step <= totalStep; step++ {
            fmt.Printf("烏龜跑了 %d 步...\n", step)
        }
    }

    func hare(totalStep int, wg *sync.WaitGroup) {
        defer wg.Done()

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
    }

    func main() {
        wg := new(sync.WaitGroup)
        wg.Add(2)

        totalStep := 10

        go tortoise(totalStep, wg)
        go hare(totalStep, wg)

        wg.Wait()
    }


### runtime.GOMAXPROCS

runtime.GOMAXPROCS() 函式，可以設定 Go 同時間能使用的 CPU 數量，

它會傳回上一次設定的數字，如果傳入小於 1 的值，不會改變任何設定，

因此，可以使用 runtime.GOMAXPROCS(0) 知道目前的設定值。

想在執行時期得知可用的 CPU 數量，可以使用 runtime.NumCPU() 函式，因此，為了確保 Go 會使用全部的 CPU 來運行

除了透過 runtime.GOMAXPROCS() 設定之外，也可以透過環境變數 GOMAXPROCS 來設置，

實際上，Go 1.5 已經預設會使用所有的 CPU 核心，

不過，仍可以透過 runtime.GOMAXPROCS() 函式或環境變數來改變設定。

Demo:

    runtime.GOMAXPROCS(runtime.NumCPU()) 

[參考網址](https://openhome.cc/Gossip/Go/Goroutine.html)

