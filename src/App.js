import { useEffect, useState } from "react";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";
import SearchBar from "./SearchBar";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/Faith-K-commits/bank-transactions/transactions"
    )
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, []);
  const addTransaction = (newTransaction) => {
    fetch(
      "https://my-json-server.typicode.com/Faith-K-commits/bank-transactions/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      }
    )
      .then((res) => res.json())
      .then((data) => setTransactions([...transactions, data]));
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = (id) => {
    fetch(
      `https://my-json-server.typicode.com/Faith-K-commits/bank-transactions/transactions/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          setTransactions(
            transactions.filter((transaction) => transaction.id !== id)
          );
        } else {
          throw new Error("Failed to delete transaction.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDelete}
      />
      <AddTransactionForm addTransaction={addTransaction} />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
