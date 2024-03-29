import express from "express";
import User from "../Schemas/UserSchema.js";
import Transaction from "../Schemas/transactionDetailsSchema.js";

const router = express.Router();


router.post("/users/:email/transactions", async (req, res) => {
    const email = req.params.email;
    const { transactionType, amount, description, category, otherCategory, date } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new transaction object
        const newTransaction = new Transaction({
            transactionType,
            amount,
            description,
            category,
            otherCategory,
            date
        });

        
        if (transactionType === 'expense') {
            if (user.Money < amount) {
                return res.status(400).json({ error: 'Insufficient funds' });
            }
            user.Money -= Number(amount); 
        } else {
            user.Money += Number(amount); 
        }
        

        user.transactions.push(newTransaction);

        
        await user.save();

        res.json({ message: 'Transaction added successfully', transaction: newTransaction });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;