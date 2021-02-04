# Ridge回歸

- 對於線性回歸的一種優化。

- 回歸通過對係數的大小進行懲罰來解決普通最小二乘的一些問題。

<img src="http://chart.googleapis.com/chart?cht=tx&chl= \min_{w} || X w - y||_2^2 + \alpha ||w||_2^2" style="border:none;">

複雜度參數α≥0控制收縮量：α值越大 ，收縮量就越大，因此係數對共線性越穩建。

目的就是讓W越小，向0靠近。

<img src="ridge_path_01.png" style="border:none;">
