import mongoose from "mongoose";
import TransactionSchema from "../Schemas/transactionDetailsSchema.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Money: {
        type: Number, 
        default: 0,
    },
    transactions: [TransactionSchema.schema] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
