import React from "react";

import { TransactionsContext } from "../contexts/TransactionsProvider";

const IncomeExpenses = () => {
  const { expenses, calculateExpenses, income, calculateIncome } =
    React.useContext(TransactionsContext);

  React.useEffect(() => {
    calculateExpenses();
  }, [expenses, calculateExpenses]);

  React.useEffect(() => {
    calculateIncome();
  }, [income, calculateIncome]);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money income">
          {income} $
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" className="money expense">
          {expenses} $
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
