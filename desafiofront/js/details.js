const readOrderItem = async () => {
  const response = await fetch("http://localhost/routes/orderItem.php");
  const data = await response.json();
  console.log;
  return data;
};

const createRow = (orderItem) => {
  const tableBody = document.querySelector(".table tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML += `
        <td>${orderItem.code}</td>
        <td>${orderItem.product_code}</td>
        <td>${orderItem.amount}</td>
        <td>$${orderItem.price}</td>
        <td>$${orderItem.tax} </td>
    `;
  tableBody.appendChild(newRow);
};

const updateTable = async () => {
  const orderItem = await readOrderItem();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("code"));
  console.log(orderItem);

  orderItem.forEach((element) => {
    if (element.order_code == urlParams.get("code")) {
      createRow(element);
      return;
    }
  });
};

updateTable();

// const dbBuy = readBuy(); // LER TODAS AS COMPRAS
// const queryString = window.location.search; // PEGAR O CÒDIGO DO URL
// const urlParams = new URLSearchParams(queryString); // LER OS PARAMETROS DO CÓDIGO DO URL
// let gay = dbBuy.find((compra) => compra.code == urlParams.get("code")); // ACHAR A COMPRA QUE PEGAMOS ANTES
// // console.log(gay); // MOSTRAR TUDINHO QUE PEGAMOS

// gay.compra.forEach((element) => { createRow() // PARA CADA ITEM DA MINHA COMPRA, CONSOLE.LOG ITEM DA MINHA COMPRA
//   console.log(element);
// });
