const selectElement = document.getElementById("selectProducts");
selectElement.innerHTML = "<option disabled>select a Products</option>";

async function getProducts() {
  const response = await fetch("http://localhost/routes/products.php");
  const productsList = await response.json();
  productsList.forEach((product) => {
    selectElement.innerHTML += `<option value="${product.code}">${product.name}</option>`;
  });
}
getProducts();

function createProduct() {
  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(productForm);
    try {
      const res = await fetch("http://localhost/routes/products.php", {
        method: "POST",
        body: data,
      }).then(async (res) => {
        console.log(await res.text());
        window.location.reload();
      });
    } catch (error) {
      console.log("que merda");
    }
  });
}
const showInput = async () => {
  const selectedProduct = document.getElementById("selectProducts").value;
  try {
    const response = await fetch("http://localhost/routes/products.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);

    if (product) {
      const amount = parseFloat(document.getElementById("amount").value);
      const tax_value = product.tax_value;
      const price = product.price;

      const totalTax = (tax_value * price * amount) / 100;
      const totalPrice = price * amount;

      document.getElementById("price").value = totalPrice.toFixed(2);
      document.getElementById("tax").value = totalTax.toFixed(2);
    }
  } catch (error) {
    console.error("Erro ao obter produtos do PHP:", error);
  }
};

document.getElementById("selectProducts").addEventListener("change", showInput);
document.getElementById("amount").addEventListener("input", showInput);

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

var carrinhoTemp = [];

const saveBuy = async () => {
  if (isValidFields()) {
    const selectedProduct = document.getElementById("selectProducts").value;
    const response = await fetch("http://localhost/routes/products.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);
    console.log(product);

    const amount = parseFloat(document.getElementById("amount").value);
    const tax_value = product.tax_value;
    const price = product.price;

    const totalTax = (tax_value * price * amount) / 100;
    const totalPrice = price * amount;
    const total = totalTax + totalPrice;

    const productExistent = carrinhoTemp.some(
      (produto) => produto.code === product.code
    );
    if (!productExistent) {
      if (amount <= product.amount) {
        const buy = {
          code: product.code,
          name: product.name,
          price: totalPrice,
          tax: totalTax,
          amount: amount,
          total: total,
        };

        createRow(buy, carrinhoTemp.length);
        carrinhoTemp.push(buy);
        showTotal();
        clearFields();
      } else {
        alert(
          `Sem estoque suficiente para essa quantidade! Digite um valor menor que ${product.amount}!`
        );
      }
    } else {
      alert("Este produto foi adicionado ao carrinho anteriormente.");
    }
  }
};

document.querySelector(".button-add input").addEventListener("click", () => {
  saveBuy();
});

const finishBuy = async () => {
  sumPrice = 0;
  sumTax = 0;
  if (carrinhoTemp.length > 0) {
    carrinhoTemp.forEach((product) => {
      sumTax += parseFloat(product.tax);
      sumPrice += parseFloat(product.price);
    });
    const response = confirm("Deseja finalizar sua compra?");
    if (response) {
      try {
        await fetch("http://localhost/routes/orders.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            total: sumPrice,
            tax: sumTax, // arrumado
          }),
        }).then(async (orders) => {
          const res = await fetch("http://localhost/routes/orders.php");
          const ordersCode = await res.json();
          const lastOrderCode = ordersCode[ordersCode.length - 1].code;
          for (const product of carrinhoTemp) {
            fetch("http://localhost/routes/orderItem.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                order_code: lastOrderCode,
                product_code: product.code,
                amount: product.amount,
                tax: product.tax,
                price: product.price,
              }),
            });
          }
        });
        carrinhoTemp = [];
        updateTable();
      } catch (error) {
        console.error(error);
        alert("merda");
      }
    }
  }
};

document.getElementById("finish").addEventListener("click", finishBuy);

const clearFields = () => {
  const fields = document.querySelectorAll(".campBuy");
  fields.forEach((field) => (field.value = ""));
};

const createRow = (buy, index) => {
  const tableBody = document.querySelector(".table tbody");

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${buy.name}</td>
      <td>${buy.amount}</td>
      <td>$${buy.price}</td>
      <td>$${buy.tax}</td>
      <td>$${buy.total}</td>
      <td>
      <button type="button" class="oi" id="delete-${index}">Excluir</button>
      </td>
  `;

  newRow.addEventListener("click", () => removeRow(newRow));
  showTotal();
  tableBody.appendChild(newRow);
};

const removeRow = (row) => {
  const response = confirm(
    "Deseja realmente excluir esse produto do carrinho?"
  );
  if (response) {
    row.remove();
    updateBuy();
  }
};

const showTotal = () => {
  sumPrice = 0;
  sumTax = 0;
  if (carrinhoTemp.length > 0) {
    carrinhoTemp.forEach((buy) => {
      sumTax += parseFloat(buy.tax);
      sumPrice += parseFloat(buy.price);
    });

    const createInputTotalPrice = document.getElementById("totalprice");
    createInputTotalPrice.value = sumPrice.toFixed(2);

    const createInputTotalTax = document.getElementById("totaltax");
    createInputTotalTax.value = sumTax.toFixed(2);
  }
};

const cancelBuy = () => {
  const response = confirm("Deseja realmente cancelar o carrinho de compras?");
  if (response);
  carrinhoTemp = [];
  updateTable();
  showTotal();
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableHome>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  clearTable();
  showTotal();
};


document.getElementById("cancel").addEventListener("click", cancelBuy);

// const getLocalStorage = () => JSON.parse(localStorage.getItem("db_buy")) ?? [];
// const setLocalStorage = (dbBuy) =>
//   localStorage.setItem("db_buy", JSON.stringify(dbBuy));

// const getProducts = () => {
//   var products = JSON.parse(localStorage.getItem("db_products"));
//   var selectProducts = document.getElementById("selectProducts");

//   products.forEach((product) => {
//     selectProducts.innerHTML += `<option value="${product.code}">${product.name}</option>`;
//   });
// };

// const readBuy = () => getLocalStorage();

// const createBuy = (buy) => {
//   let dbBuy = JSON.parse(localStorage.getItem("db_buy")) || [];
//   dbBuy.push(buy);
//   localStorage.setItem("db_buy", JSON.stringify(dbBuy));
// };

// const showInput = () => {
//   const selectedProduct = document.getElementById("selectProducts").value;
//   const amount = parseFloat(document.getElementById("amount").value);
//   const products = JSON.parse(localStorage.getItem("db_products"));
//   const product = products.find((p) => p.code === Number(selectedProduct));

//   const totalPrice = product.price * amount;
//   const totalTax = totalPrice * (product.categoryTax / 100);

//   document.getElementById("price").value = totalPrice.toFixed(2);
//   document.getElementById("tax").value = totalTax.toFixed(2);
// };

// document.getElementById("amount").addEventListener("input", showInput);

// let carrinhoTemp = [];

// const isValidFields = () => {
//   return document.getElementById("form").reportValidity();
// };

// const saveBuy = () => {
//   if (isValidFields()) {
//     const selectedProduct = document.getElementById("selectProducts").value;
//     const amount = parseFloat(document.getElementById("amount").value);
//     const products = JSON.parse(localStorage.getItem("db_products"));
//     const product = products.find((p) => p.code === Number(selectedProduct));
//     const totalPrice = product.price * amount;
//     const totalTax = totalPrice * (product.categoryTax / 100);
//     const total = totalTax + totalPrice;

//     const productExistent = carrinhoTemp.some(
//       (produto) => produto.code === product.code
//     );
//     if (!productExistent) {
//       if (amount <= product.amount) {
//         const buy = {
//           code: product.code,
//           name: product.name,
//           price: totalPrice,
//           tax: totalTax,
//           amount: amount,
//           total: total,
//         };

//         createRow(buy, carrinhoTemp.length);
//         carrinhoTemp.push(buy);
//         showTotal();
//         clearFields();
//       } else {
//         alert(
//           `Sem estoque suficiente para essa quantidade! Digite um valor menor que ${product.amount}!`
//         );
//       }
//     } else {
//       alert("Este produto foi adicionado ao carrinho anteriormente.");
//     }
//   }
// };

// const updateStock = (productName, purchasedAmount) => {
//   const products = JSON.parse(localStorage.getItem("db_products"));
//   const productIndex = products.findIndex((p) => p.name === productName);

//   if (productIndex !== -1) {
//     products[productIndex].amount -= purchasedAmount;
//     localStorage.setItem("db_products", JSON.stringify(products));
//   }
// };

// const finishBuy = () => {
//   const code = Math.floor(Math.random() * 1000);
//   if (carrinhoTemp.length > 0) {
//     const dbBuy = readBuy();
//     const response = confirm("Deseja finalizar sua compra?");
//     if (response) {
//       carrinhoTemp.forEach((item) => {
//         updateStock(item.name, item.amount);
//       });

//       dbBuy.push({ code, sumPrice, sumTax, compra: [...carrinhoTemp] });

//       setLocalStorage(dbBuy);

//       carrinhoTemp = [];
//       updateTable();
//     }
//   }
// };

// document.querySelector(".button-add input").addEventListener("click", () => {
//   saveBuy();
// });

// const createRow = (buy, index) => {
//   const tableBody = document.querySelector(".table tbody");

//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//       <td>${buy.name}</td>
//       <td>${buy.amount}</td>
//       <td>$${buy.price}</td>
//       <td>$${buy.tax}</td>
//       <td>$${buy.total}</td>
//       <td>
//       <button type="button" id="delete-${index}">Excluir</button>
//       </td>
//   `;

//   newRow.addEventListener("click", () => removeRow(newRow));
//   showTotal();
//   tableBody.appendChild(newRow);
// };

// const removeRow = (row) => {
//   const response = confirm(
//     "Deseja realmente excluir esse produto do carrinho?"
//   );
//   if (response) {
//     row.remove();
//     updateBuy();
//   }
// };

// const updateBuy = (index, buy) => {
//   const dbBuy = readBuy();
//   dbBuy[index] = buy;
//   setLocalStorage(dbBuy);
//   showTotal();
// };
// const clearFields = () => {
//   const fields = document.querySelectorAll(".campBuy");
//   fields.forEach((field) => (field.value = ""));
// };

// const clearTable = () => {
//   const rows = document.querySelectorAll("#tableHome>tbody tr");
//   rows.forEach((row) => row.parentNode.removeChild(row));
// };

// const updateTable = () => {
//   clearTable();
//   showTotal();
// };

// const showTotal = () => {
//   sumPrice = 0;
//   sumTax = 0;
//   if (carrinhoTemp.length > 0) {
//     carrinhoTemp.forEach((buy) => {
//       sumTax += parseFloat(buy.tax);
//       sumPrice += parseFloat(buy.price);
//     });

//     const createInputTotalPrice = document.getElementById("totalprice");
//     createInputTotalPrice.value = sumPrice.toFixed(2);

//     const createInputTotalTax = document.getElementById("totaltax");
//     createInputTotalTax.value = sumTax.toFixed(2);
//   }
// };

// const cancelBuy = () => {
//   const response = confirm("Deseja realmente cancelar o carrinho de compras?");
//   if (response);
//   carrinhoTemp = [];
//   updateTable();
// };

// getProducts();
// updateTable();

// document.getElementById("finish").addEventListener("click", finishBuy);

// document.getElementById("cancel").addEventListener("click", cancelBuy);
