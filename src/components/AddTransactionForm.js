import { useState } from "react";

const AddTransactionForm = ({ addTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const newTransaction = {

            description,
            amount: parseFloat(amount),
            date
        };
        addTransaction(newTransaction);
        setDescription('');
        setAmount('');
        setDate('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}

export default AddTransactionForm;