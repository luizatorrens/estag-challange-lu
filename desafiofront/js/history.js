const readOrder = async () => {
  const response = await fetch("http://localhost/routes/orders.php");
  const data = await response.json();
  return data;
};

const createRow = (order) => {
  const tableBody = document.querySelector(".table tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${order.code}</td>
        <td>$${order.total}</td>
        <td>$${order.tax}</td>
        <td>
          <button type="button" class="oi">
            <a href="details.html?code=${order.code}">View</a>
          </button>
        </td>
    `;
  tableBody.appendChild(newRow);
};

const updateTable = async () => {
  const order = await readOrder();
  order.forEach((order, index) => {
    createRow(order, index);
  });
};

updateTable()

// const getLocalStorage = () => JSON.parse(localStorage.getItem("db_buy")) ?? [];
// const setLocalStorage = (dbBuy) =>
//   localStorage.setItem("db_buy", JSON.stringify(dbBuy));

// const readBuy = () => getLocalStorage();

// const createRow = (buy) => {
//   const tableBody = document.querySelector(".table tbody");
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//         <td>${buy.code}</td>
//         <td>$${buy.sumPrice}</td>
//         <td>$${buy.sumTax}</td>
//         <td>
//           <button type="button">
//             <a href="details.html?code=${buy.code}">View</a>
//           </button>
//         </td>
//     `;
//   tableBody.appendChild(newRow);
// };

// const updateTable = () => {
//   const dbBuy = readBuy();
//   dbBuy.forEach(createRow);
// };

// updateTable();
