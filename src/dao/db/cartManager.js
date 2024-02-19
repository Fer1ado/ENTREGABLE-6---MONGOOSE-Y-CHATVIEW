import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js"
import Cart from "../filesystem/cart.js"

class CartDAO {
    async findAll(limit) {
        return await cartModel.find().limit(limit);
    }

    async getCarrito(cid) {
        try {
            const busqueda =  await cartModel.find({cartNumber : cid});
            return busqueda
            
        } catch (err) {
            return{status: "failed", message: err.message}}
    }

    async createCart() {
        try {
            //traigo mi Clase de carrito y lo creo
            const newCart = new Cart()
            //busco que no se esten repitiendo ids
            const chequeo = await this.getCarrito(parseInt(newCart.cartNumber)) 
            //si se repiten reinicio la operacion
                if(!chequeo){
                await this.createCart()
            }
                else {
            //si no creo el nuevo carrito
                const cart = await cartModel.create(newCart)
                return {status: "success", msg:`CARRITO NUMERO ${cart.cartNumber} CREADO CON EXITO`, cart}
            }   
        } catch (err) {
            return{status: "failed", message: err.message}
        }
    }

    async addCartProd(CARTid, prodId) {
        const added = await this.isAddedCart(CARTid, prodId)
            try {
                if(added === "agregar al carro"){
                    const busquedaProd = await productModel.findById(prodId)
                        if(busquedaProd){
                            let carroNuevo =  await this.getCarrito(parseInt(CARTid))
                            console.log(prodId, carroNuevo)
                            carroNuevo[0].products.push({product: prodId})
                            console.log(carroNuevo[0])
                            
                            const prodAddtoCart = await cartModel.findOneAndUpdate({cartNumber: CARTid}, carroNuevo )
                           // {cartNumber: CARTid}, {products: [{productID: busquedaProd._id, quantity: 1}]},  )
                            const busquedaedit = await this.getCarrito(parseInt(CARTid))
                            console.log(busquedaedit[0])
                        return {status: "success", message: `${busquedaProd.title} FUE AGREGADO CON EXITO AL CARRO Nº ${CARTid}`, prodAddtoCart}
                    }
                    else{
                        return{status: "failed", message: "PRODUCTO INEXISTENTE EN BASE DE DATOS"}}
                }
                if(added === "aumentar cantidad"){
                    
                }
        }
        catch (error) {
            return{status: "failed", message: error.message}
        }
    }

    async isAddedCart(cid, pid){
        //const produ = await this.findAll()
        const cart = await this.getCarrito(cid)
        //const cart =  produ.some((e) => e.cartNumber === cid)
        const contenido = cart.find((e) => e.products.find(e => e.productid === pid))
       
        //console.log(contenido)
        
        if (!cart) {
          console.log("No hay carritos creados con ese id")
          return null
        } if(contenido === undefined) {
          return ("agregar al carro")
        } else {
          return ("aumentar cantidad")}
    } 

    async deleteCart(ID) {
        try {
            const cart = await cartModel.findById(ID);
            if (!cart) {
            throw new Error(`Cart with ID ${ID} not found`);
            }
            else {
                await cartModel.findByIdAndDelete({_id : ID});
                return{status: "Success", message: `CARRITO ${ID} BORRADO CON EXITO`}
            }
            } catch (error) {
            return{status: "failed", message: error.message}
        }
    }
}

export const MongoCartManager =  new CartDAO();