const express = require("express")
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 8000
var sid = "AC2c988b6e074d11552f8d3407dcd0f348"
var auth_token = "22835c6916b5dc43942c04e88b39c265"
var twilio = require("twilio")(sid,auth_token)

app.use(cors())




app.use(bodyParser.urlencoded({
    extended: false
 }));


 
 app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send("GGWP")

})

app.post("/alertUser",(req,res)=>{
    console.log("alert")

    twilio.messages.create({
        from:"sender_no",
        to:req.body.custNum,
        body:"Your order has arrived"
    }).then((res)=>
    console.log("Your order has arrived")).catch((err)=>console.log(err))
    

})

app.post("/sendReceipt",(req,res)=>{
    // console.log(res)
    console.log("received receipt")
    console.log(req.body.custNum)
    console.log(req.body.items)
    console.log(req.body.totalCost)
    console.log(req.body.totalGst)
    console.log(req.body.nettCost)
    console.log(req.body.tableNum)
    var msg = "Thank you for your purchase."
    var purchaseDate = new Date();
    var formattedDate =  purchaseDate.getDate() + "/"+ purchaseDate.getMonth()+"/"+purchaseDate.getFullYear() + "," + purchaseDate.getHours()+":"+purchaseDate.getMinutes()+":"+purchaseDate.getSeconds()

    msg += "\nPurchase date: "+formattedDate
    req.body.items.map(
        cartItem =>{
            var qtyCost = cartItem.price * cartItem.qty
            msg = msg + "\nName: " +cartItem.name + ",Qty: "+cartItem.qty.toFixed(2) +",Cost: $"+qtyCost.toFixed(2)
        }
    )
    msg += "\nTotal cost: $"+req.body.totalCost.toFixed(2)
    msg += "\nTotal GST: $"+req.body.totalGst.toFixed(2)
    msg += "\nNett cost: $"+req.body.nettCost.toFixed(2)
    if(req.body.tableNum == 0){
        msg += "\nOrder: Takeaway"
    }
    else{
        msg += "\nTable number: "+req.body.tableNum
    }
    twilio.messages.create({
        from:"sender_no",
        to:req.body.custNum,
        head:"Receipt",
        body:msg
    }).then((res)=>
    console.log("message sent")).catch((err)=>console.log(err))

    // console.log("Receipt sent")

})

app.listen(PORT, ()=>{
    console.log(`App listening at port:${PORT}`)

})




