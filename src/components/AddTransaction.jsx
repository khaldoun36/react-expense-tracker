import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { TransactionsContext } from "../contexts/TransactionsProvider";

const AddTransaction = () => {
  const { addTransaction } = React.useContext(TransactionsContext);

  const [text, setText] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [option, setOption] = React.useState("income");

  // Toast code
  const incomeNotify = () =>
    toast.success(`${amount}$ added to your account`, {
      icon: "🤑",
    });
  const expenseNotify = () =>
    toast.success(`You have spent ${amount}$`, { icon: "💸" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      id: crypto.randomUUID(),
      text: text,
      amount: Number(amount),
      transactionType: option,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");

    if (newTransaction.transactionType === "income") {
      incomeNotify();
    } else {
      expenseNotify();
    }
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            placeholder="Enter text..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount..."
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <div className="radio-buttons">
            <label htmlFor="option-income">
              <input
                id="option-income"
                type="radio"
                name="option"
                value="income"
                checked={option === "income"}
                onChange={(event) => {
                  setOption(event.target.value);
                }}
              />
              Income
            </label>
            <label htmlFor="option-expense">
              <input
                id="option-expense"
                type="radio"
                name="option"
                value="expense"
                checked={option === "expense"}
                onChange={(event) => {
                  setOption(event.target.value);
                }}
              />
              Expense
            </label>
          </div>
        </div>
        <button className="btn">Add transaction</button>
      </form>
      <Toaster position="bottom-right" />
    </>
  );
};

export default AddTransaction;
