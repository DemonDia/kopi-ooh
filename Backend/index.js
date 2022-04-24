const express = require("express")
const app = express()
const port = 3001

app.get("/",(req,res)=>{
    res.send("GGWP")

})

app.listen(port, ()=>{
    console.log(`App listening at port:${port}`)

})

const sendTextMsg = () =>{
    
}