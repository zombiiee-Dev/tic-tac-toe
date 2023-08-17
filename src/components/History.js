import React from "react";

function History({ histories, handleClickHistory }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        {histories.map((history, index) => (
          <li key={index}>
            <button onClick={() => handleClickHistory(index)}>
              {history.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
