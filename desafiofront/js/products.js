const productForm = document.getElementById("form");

const readProduct = async () => {
  const response = await fetch("http://localhost/routes/products.php");
  const data = await response.json();
  return data;
};

const selectElement = document.getElementById("selectCategories");
selectElement.innerHTML = "<option disabled>select a Category</option>";

async function getCategories() {
  const response = await fetch("http://localhost/routes/categories.php");
  const categoriesList = await response.json();
  categoriesList.forEach((category) => {
    selectElement.innerHTML += `<option value="${category.code}">${category.name}</option>`;
  });
}

getCategories();

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

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

const createRow = (product) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td>${product.code}</td>
          <td>${product.name}</td>
          <td>${product.amount}</td>
          <td>${product.price}</td>
          <td>${product.category_name}</td>
          <td><button onclick="deletarProduct(${product.code})" class="oi" type="button">Delete</button> </td>
`;
  document.querySelector("#tableProduct>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableProduct>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = async () => {
  clearTable();

  const product = await readProduct();

  product.forEach((product, index) => {
    createRow(product, index);
  });
};

const deletarProduct = async (code) => {
  await fetch(`http://localhost/routes/products.php?code=${code}`, {
    method: "DELETE",
  }),
    window.location.reload();
};

updateTable();

// const getLocalStorage = () =>
//   JSON.parse(localStorage.getItem("db_products", "db_category")) ?? [];
// const setLocalStorage = (dbProducts) =>
//   localStorage.setItem("db_products", JSON.stringify(dbProducts));

// const deleteProducts = (index) => {
//   const dbProducts = readProducts();
//   dbProducts.splice(index, 1);
//   setLocalStorage(dbProducts);
// };

// const updateProducts = (index, product) => {
//   const dbProducts = readProducts();
//   dbProducts[index] = product;
//   setLocalStorage(dbProducts);
// };

// const readProducts = () => getLocalStorage();

// const getCategories = () => {
//   var categories = JSON.parse(localStorage.getItem("db_category"));
//   var selectCategories = document.getElementById("selectCategories");

//   categories.forEach((category) => {
//     selectCategories.innerHTML += `<option value="${category.code}">${category.name}</option>`;
//   });
// };

// const createProduct = (product) => {
//   const dbProducts = getLocalStorage();

//   dbProducts.push(product);
//   setLocalStorage(dbProducts);
// };

// const clearFields = () => {
//   const fields = document.querySelectorAll(".campProduct");
//   fields.forEach((field) => (field.value = ""));
// };

// const isValidFields = () => {
//   return document.getElementById("form").reportValidity();
// };

// const saveProduct = () => {
//   const codigoAleatorio = Math.floor(Math.random() * 1000);
//   const selectedCategory = document.getElementById("selectCategories").value;
//   const categories = JSON.parse(localStorage.getItem("db_category"));
//   const category = categories.find((c) => c.code === Number(selectedCategory));
//   if (isValidFields()) {
//     const product = {
//       code: codigoAleatorio,
//       name: document
//         .getElementById("name")
//         .value.replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;"),
//       amount: document
//         .getElementById("amount")
//         .value.replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;"),
//       price: document
//         .getElementById("price")
//         .value.replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;"),
//       categoryName: category.name,
//       categoryTax: category.tax,
//     };
//     createProduct(product);
//     updateTable();
//     clearFields();
//   }
// };

// function getCategory(code) {
//   categories = JSON.parse(localStorage.getItem("db_category"));
//   for (const category of categories) {
//     if (code == category.code) return category;
//   }
// }

// var input = document.querySelector("#name");
// input.addEventListener("keypress", function (e) {
//   if (!checkChar(e)) {
//     e.preventDefault();
//   }
// });
// function checkChar(e) {
//   var char = String.fromCharCode(e.keyCode);

//   var pattern = "[a-zA-Z0-9]";
//   if (char.match(pattern)) {
//     return true;
//   }
// }

// const createRow = (product, index) => {
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//   <td>${product.code}</td>
//   <td>${product.name}</td>
//   <td>${product.amount}</td>
//   <td>${product.price}</td>
//   <td>${product.categoryName}</td>
//   <td>
//     <button type="button" id="delete-${index}">Excluir</button>
//   </td>
//   `;
//   document.querySelector("#tableProduct>tbody").appendChild(newRow);
// };

// const clearTable = () => {
//   const rows = document.querySelectorAll("#tableProduct>tbody tr");
//   rows.forEach((row) => row.parentNode.removeChild(row));
// };

// const updateTable = () => {
//   const dbProducts = readProducts();
//   clearTable();
//   dbProducts.forEach(createRow);
// };

// const delProduct = (event) => {
//   if (event.target.type == "button") {
//     const [action, index] = event.target.id.split("-");
//     if (action == "delete") {
//       const product = readProducts()[index];
//       const response = confirm(
//         `Deseja realmente excluir o produto ${product.name}?`
//       );
//       if (response) deleteProducts(index);
//       updateTable();
//     } else {
//       console.log("você não clicou em nada");
//     }
//   }
// };

// updateTable();
// getCategories();
// document.getElementById("save").addEventListener("click", saveProduct);

// document
//   .querySelector("#tableProduct>tbody")
//   .addEventListener("click", delProduct);
