# gbdt 方法

- 參考 https://scikit-learn.org/stable/modules/ensemble.html#gradient-tree-boosting

- 梯度增強決策樹（GBDT）是對任意微分可損失函數進行增強的一種概括。
- GBDT是一種準確而有效的現成方法，可用於Web搜索排名和生態學等多個領域的回歸和分類問題。  

- GB以漸進的階段方式建立加性模型； 它允許優化任意微分損失函數。 
- 在每個階段，將n_classes_回歸樹擬合到二項式或多項式偏差損失函數的負梯度上。 
- 二進制分類是一種特殊情況，其中僅誘導單個回歸樹。
