import React from 'react';

function TransactionList({ transactions }) {
  return (
    <>
      <h3>Transactions:</h3>
      <ul>
        {transactions.map((t, index) => (
          <React.Fragment key={index}>
            <li>{t}</li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}


export default TransactionList;
