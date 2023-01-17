const express=require('express')
const app= express()
const {createServer}= require('http')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
const socketIo = require('socket.io')
const { dbMaria, dbSqlite } = require('./knex')
const{createTable}=require("./model")
const{container}=require("./controller")
const server=createServer(app)
const io =socketIo(server)


app.set('views', './public')
app.set('view engine', 'ejs')
const productsContainer=new container(dbMaria,"productos")
const messageContainer= new container(dbSqlite,"mensajes")
let products=[]
let messages=[]
app.get('/',async (req,res)=>{
    const produc= await productsContainer.readElements()
    res.render('form.ejs',{produc})
  
})


io.on('connection',async(client) => {
    products=await productsContainer.readElements()//guardo todos los productos y mensajes en una variable
    messages=await messageContainer.readElements()
    console.log("cliente se conecto")
    client.emit("messages",messages)//emito al cliente los mensajes y productos
    client.emit("products",products)
    
    //escucho el nuevo mensaje recibido del cliente, lo guardo en una variable con el resto de los mensajes y lo emito a todos
    client.on("newMessage",async(msg)=>{
        await messageContainer.createElement(msg)
        messages=await messageContainer.readElements()
        io.sockets.emit("messageAdded",messages)
       
    })
    //escucho el nuevo producto recibido del cliente, lo guardo en una variable con el resto de los productos y lo emito a todos
    client.on("newProduct",async(pro)=>{
        await productsContainer.createElement(pro)
        products=await productsContainer.readElements()
        io.sockets.emit("productAdded",products)
    })
 });
 server.listen(8080,(req,res)=>{
    console.log("funciona")
})