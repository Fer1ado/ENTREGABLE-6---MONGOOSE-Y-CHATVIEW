import mongoose, { Mongoose, Schema, model } from "mongoose";

const cartsSchema = new Schema({
    cartNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    products:{
        type: [
            {
                product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "products"
                },
            },
        ],
        default: [],
    }
})

export const cartModel = model('cart', cartsSchema)