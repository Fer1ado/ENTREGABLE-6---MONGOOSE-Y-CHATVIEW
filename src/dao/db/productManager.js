import { productModel } from "../models/product.model.js";

class ProductDAO {
    async getProducts(limit) {
        return await productModel.find().limit(limit);
    }

    async getProductById(id) {
        try{
        const product = await productModel.findById({_id: id});
            return product
        } catch(err){
            return{status: "failed", message: err.message}
        }
        
    }
    async addMany(productData) {
        try {
            const products = await productModel.addMany(productData.products);
            return products
        } catch (err) {
            return {status: 'error', message: err.message}
        }
    }


    async addProduct(productData) {
        try{
            const productDetails = await productModel.findOne({code: productData.code,});
            if(productDetails && Object.keys(studentDetail).length !== 0){
                return null
            }
            const newProduct = await productModel.create(productData);
            return newProduct;

        }catch(err){
            return {status: 'error', message: err.message}
        }
    }

    async updateProduct(id, updateData) {
        try{
        const edit = await productModel.findByIdAndUpdate(id, updateData, { new: true });
            return edit
        }catch(err){
            return {status: "failed", message: err.message}
        }
    }

    async deleteProduct(id) {
        try{
            const erase = await productModel.findByIdAndDelete(id);
            return erase         
        }catch(err){
            return {status: "failed", message: err.message}
        }
    }
}

export const MongoProductManager = new ProductDAO();