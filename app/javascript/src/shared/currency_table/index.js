import React from 'react';

const CurrencyTable = ({
  columns,
  data
}) => {
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {data.map((data, i) => (
              <tr key={i}>
                {columns.map((column, j) => (
                  <td key={`${i}-${j}`}>{data[column.accessor]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyTable;
