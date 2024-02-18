import { cartModel } from "../models/cart.model.js";

class CartDAO {
    async findAll(limit) {
        return await cartModel.find().limit(limit);
    }

    async getCarrito(id) {
        return await cartModel.findById(id);
    }

    async createCart(cartData) {
        return await cartModel.create(cartData);
    }

    async deleteCart(cartID) {
        const ID = parseInt(cartID)
        const cart = await cartModel.findById(ID);
    
        if (!cart) {
        throw new Error(`Cart with ID ${ID} not found`);
        }
        await cartModel.findByIdAndDelete(ID);
      }
}

export const MongoCartManager =  new CartDAO();