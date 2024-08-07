import { useEffect, useState } from "react";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";
import SearchBar from "./SearchBar";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(error => console.log(error))
  }, [])
  const addTransaction = newTransaction => {
    setTransactions([...transactions, newTransaction])
  }
  const handleSearch = term => {
    setSearchTerm(term);
  };
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <TransactionList transactions={filteredTransactions} />
      <AddTransactionForm addTransaction={addTransaction} />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
