# 使用numpy 計算微積分

套件:

    from scipy import integrate
    import numpy as np
    from scipy.special import gamma 
    


函式:

  <img src="積分函式_01.png"/>
  
  **Γ函數**，也叫做**伽瑪函數（Gamma函數）**

    def f(x):
        return  (gamma(99.5)/( pow(198*3.1415,0.5) * gamma(99)))*pow((1 + (pow(x, 2)/198)),-99.5)


    v, err = integrate.quad(f, 0, 26.0457)
    
    print(v)


