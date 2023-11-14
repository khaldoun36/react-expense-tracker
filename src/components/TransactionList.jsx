import React from "react";
import { TransactionsContext } from "../contexts/TransactionsProvider.jsx";

const TransactionList = () => {
  const { transactions, removeTransaction } =
    React.useContext(TransactionsContext);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transactionItem) => (
          <li
            className={transactionItem.transactionType}
            key={transactionItem.id}
          >
            {transactionItem.text} <span>{transactionItem.amount}</span>
            <button
              className="delete-btn"
              onClick={() => removeTransaction(transactionItem.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
