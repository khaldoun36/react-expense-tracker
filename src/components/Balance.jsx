import React from "react";

import { TransactionsContext } from "../contexts/TransactionsProvider";

const Balance = () => {
  const { balance } = React.useContext(TransactionsContext);

  const textStyle = balance === 0 ? "" : balance > 0 ? "2ecc71" : "c0392b";

  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance" style={{ color: `#${textStyle}` }}>
        {balance} $
      </h1>
    </>
  );
};

export default Balance;
