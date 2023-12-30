const express = require("express");
const app = express();

const users = [{
    name: "John",
    kidney: [{
         healthy: false
    }]
}]

app.use(express.json())

app.get("/", function(req, res){
    const johnkidneys = users[0].kidney;
    const numberofkidneys = johnkidneys.length;
    let numberofhealthykidneys = 0;
    for(let i = 0; i<numberofkidneys; i++){
         if(johnkidneys[i].healthy){
            numberofhealthykidneys = numberofhealthykidneys + 1;
         }
    }
    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys,
    })
})

app.post("/", function(req, res){
    const ishealthy = req.body.ishealthy;
    users[0].kidney.push({
        healthy: ishealthy,
    })
    res.json({
        msg: "done!"
    })
})

app.put("/", function(req, res){
    for(let i = 0; i<users[0].kidney.length; i++){
        users[0].kidney[i].healthy = true;
    }
    res.json({})
})

app.delete("/", function(req,  res){
    if(checkforbadkidneys()){
        const newkidneys = [];
        for(let i = 0; i<users[0].kidney.length; i++){
            if(users[0].kidney[i].healthy){
                newkidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidney = newkidneys;
        res.json({msg: "hogya bhai !!"})
    }
    else{
        res.status(411).json({
            msg: "you have no bad kidneys"
        });
    }
   
})

function checkforbadkidneys(){
    let atleastoneunhealthy = false;
    for(let i = 0; i<users[0].kidney.length; i++){
        if(!users[0].kidney[i].healthy){
            atleastoneunhealthy = true;
        }
    }
    return atleastoneunhealthy;
}

app.listen(3000);