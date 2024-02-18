import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
    cartID:{
        type: Number,
        required: true
    },
    products:[
        {
            productID: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

export const cartModel = model('cart', cartsSchema)