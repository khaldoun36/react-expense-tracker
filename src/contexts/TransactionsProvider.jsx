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
  const [expenses, setExpenses] = React.useState(0);
  const calculateExpenses = () => {
    const totalExpenses = transactions
      .filter(
        (singleTransaction) => singleTransaction.transactionType === "expense"
      )
      .reduce((acc, singleTransaction) => {
        return acc + singleTransaction.amount;
      }, 0);
    setExpenses(totalExpenses);
  };

  // calculate income
  const [income, setIncome] = React.useState(0);
  const calculateIncome = () => {
    const totalIncome = transactions
      .filter(
        (singleTransaction) => singleTransaction.transactionType === "income"
      )
      .reduce((acc, singleTransaction) => {
        return acc + singleTransaction.amount;
      }, 0);
    setIncome(totalIncome);
  };

  //  Calculate total balance
  const [balance, setBalance] = React.useState(0);
  const calculateBalance = () => {
    const totalBalance = income - expenses;
    setBalance(totalBalance);
  };

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
        calculateExpenses,
        income,
        calculateIncome,
        balance,
        calculateBalance,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
