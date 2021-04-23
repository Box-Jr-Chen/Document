const express = require('express');
const app =express();


let count =0
app.get('/',(req,res)=>{
    for(let i=0;i<1e8;i++){

    }
    res.send(`ok!`);
    //cluster.worker.kill();
});

app.listen(3000,()=>{console.log('start server') });