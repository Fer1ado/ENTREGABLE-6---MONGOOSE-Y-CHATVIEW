import ProductManager from "../dao/filesystem/productManager.js";
import { MongoProductManager } from "../dao/db/productManager.js";
import { Router } from "express";

const prodRoute = Router();
const ejecutar = new ProductManager();


//pedido de productos por ID
prodRoute.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await MongoProductManager.getProductById(pid))

});

//Pedido de listado completo
prodRoute.get("/:limit?", async (req,res)=>{
  const limit = parseInt(req.query.limit)
  res.send(await MongoProductManager.getProducts(limit))
  
})

//Subida de productos
prodRoute.post("/", async (req, res) => {
  res.send(await MongoProductManager.addProduct(req.body))   
});

prodRoute.post("/many", async (req, res) => {
  res.send(await MongoProductManager.addProduct(req.body))   
});

//editado de producto
prodRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await MongoProductManager.updateProduct(id, req.body))
});

//borrado de producto
prodRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await MongoProductManager.deleteProduct(id))
});

export default prodRoute;
