
import 'dotenv/config'
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import path from "path"
import {Server} from "socket.io"
import displayRoutes from 'express-routemap';


//importación de rutas persistencia archivos locales
import cartRoute from "./routes/cart.routes.js";
import prodRoute from "./routes/products.routes.js";
import viewsRoute from "./routes/views.routes.js";
import ProductManager from "./dao/filesystem/productManager.js";

//importacion rutas de persistencia MongogoDB
import { MongoCartManager } from './dao/db/cartManager.js';
import { MongoProductManager } from './dao/db/productManager.js';
import { MongoMessagesManager } from './dao/db/messageManager.js';



/// CONFIG/IMPORT SERVIDOR
import express from "express";
import { _dirname } from "./utils.js";

const app = express()
const PORT = 8080;

/// CONEXION A MONGO DB
mongoose.connect(process.env.DB_CNN)
    .then(() => console.log('Conectado a Mongo Exitosamente'))
    .catch(() => console.log('Error al conectarse a la base de datos'))

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(_dirname + "/public"))
app.use('/realtimeproducts', express.static(path.join(_dirname, '/public')))
app.use('/home', express.static(path.join(_dirname, '/public')))

// SETEO DE PUERTO
const httpserver = app.listen(PORT, ()=>{
  displayRoutes(app)
  console.log(`Server listening on port ${PORT}`)
})

//IMPLEMENTACION SOCKET IO
const io = new Server(httpserver)

io.on('connection', (socket)=> {
  console.log('servidor de socket io conectado')

  socket.on('nuevoProducto', async (nuevoProd) => {
      const {title, description,category, thumbnail, price, stock, code} = nuevoProd
      const response = await MongoProductManager.addProduct({title: title, description: description, price: price, category: category, thumbnail: thumbnail, price: price, stock: stock, code: code})
      console.log(response)
      const products = await MongoProductManager.getProducts()
      socket.emit('products-data', products)
      socket.emit("status-changed", response)
  })

  socket.on('update-products', async () => {
      const products = await MongoProductManager.getProducts();
      socket.emit('products-data', products);
  });

  socket.on('remove-product', async (prodID) => {
      console.log("inicio remove socket")
      const result = await MongoProductManager.deleteProduct(prodID) 
      socket.emit("status-changed", result)
      const products = await MongoProductManager.getProducts()
      socket.emit('products-data', products)
      console.log("fin remove socket")
  })
})






// CONFIG HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", path.resolve(_dirname, "./views"))
app.set("view engine", "handlebars")


// VISTAS
app.get("/realtimeproducts", (req, res) => {
  res.render ("realtimeproducts", {} )
})

app.get("/home", async (req, res)=> {
  const products = await manager.getProducts()
  console.log(JS)
  res.render("home", {...products})
})

app.get("/chat", async (req, res)=>{
  const msgs = {}
})


//ROUTES
app.use("/api/products", prodRoute);
app.use("/api/cart", cartRoute)
app.use("/api/realtimeproducts", viewsRoute);


const manager = new ProductManager()