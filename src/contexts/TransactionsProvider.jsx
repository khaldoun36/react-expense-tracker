import React from "react";

export const TransactionsContext = React.createContext();

const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = React.useState(() => {
    const localTransactions = localStorage.getItem("transactions");
    return localTransactions ? JSON.parse(localTransactions) : [];
  });

  // write to local storage
  React.useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // calculate expenses
  const expenses = transactions
    .filter(
      (singleTransaction) => singleTransaction.transactionType === "expense"
    )
    .reduce((acc, singleTransaction) => {
      return acc + singleTransaction.amount;
    }, 0);

  // calculate total income
  const income = transactions
    .filter(
      (singleTransaction) => singleTransaction.transactionType === "income"
    )
    .reduce((acc, singleTransaction) => {
      return acc + singleTransaction.amount;
    }, 0);

  //  Calculate total balance
  const balance = income - expenses;

  // add to the transactions list
  const addTransaction = (transaction) => {
    const nextTransactions = [...transactions, transaction];
    setTransactions(nextTransactions);
  };

  const removeTransaction = (id) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(filteredTransactions);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        expenses,
        income,
        balance,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
