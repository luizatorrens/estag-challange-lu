const categoryForm = document.getElementById("categorytax");

const readCategory = async () => {
  const response = await fetch("http://localhost/routes/categories.php");
  const data = await response.json();
  return data;
};

function createCategory(){
  categoryForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const data = new FormData(categoryForm)
    try{
      const res = await fetch("http://localhost/routes/categories.php", {
        method: "POST",
        body: data
      }, window.location.reload()
      )}catch(error){
        console.log("que merda")
      }
    })
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const createRow = (category) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td>${category.code}</td>
          <td>${category.name}</td>
          <td>${category.tax}</td>
          <td><button onclick="deletarCategory(${category.code})" class="oi"type="button">Delete</button> </td>
`;
  document.querySelector("#tableCategory>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableCategory>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = async () => {
  clearTable();

  const category = await readCategory();

  category.forEach((category, index) => {
    createRow(category, index);
  });
};

const deletarCategory = async (id) => {
  await fetch(`http://localhost/routes/categories.php?id=${id}`, {
    method: "DELETE",
  }), window.location.reload();
};

updateTable();


// const getLocalStorage = () =>
//   JSON.parse(localStorage.getItem("db_category")) ?? [];
// const setLocalStorage = (dbCategory) =>
//   localStorage.setItem("db_category", JSON.stringify(dbCategory));

// const deleteCategory = (index) => {
//   const dbCategory = readCategory();
//   dbCategory.splice(index, 1);
//   setLocalStorage(dbCategory);
// };

// const updateCategory = (index, category) => {
//   const dbCategory = readCategory();
//   dbCategory[index] = category;
//   setLocalStorage(dbCategory);
// };

// const readCategory = () => getLocalStorage();

// const createCategory = (category) => {
//   const dbCategory = getLocalStorage();
//   dbCategory.push(category);
//   setLocalStorage(dbCategory);
// };

// const clearFields = () => {
//   const fields = document.querySelectorAll(".campCategory");
//   fields.forEach((field) => (field.value.replace(/</g,"&lt;").replace(/>/g,"&gt;") = ""));
// };

// const isValidFields = () => {
//   return document.getElementById("categorytax").reportValidity();
// };

// const saveCategory = () => {
//   var form=document.getElementById('categorytax')

//   form.addEventListener('submit', function(e){
//   e.preventDefault()

//   fetch("http://localhost/routes/categories.php", {
//     method: "POST",

//       body: JSON.stringify({
//         "name": document.getElementById("categoryname").value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
//         "tax": document.getElementById("tax").value.replace(/</g, "&lt;").replace(/>/g, "&gt;"),

//       }),
//   })
//   .then(function(response){
//     return response.json()})

//   });
//   clearFields();};

// var input = document.querySelector("#categoryname");
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

// const createRow = (category, index) => {
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//   <td>${category.code}</td>
//   <td>${category.name}</td>
//   <td>${category.tax}</td>
//   <td>
//     <button type="button" id="delete-${index}">Excluir</button>
//   </td>
//   `;
//   document.querySelector("#tableCategory>tbody").appendChild(newRow);
// };

// const clearTable = () => {
//   const rows = document.querySelectorAll("#tableCategory>tbody tr");
//   rows.forEach((row) => row.parentNode.removeChild(row));
// };

// const updateTable = () => {
//   const dbCategory = readCategory();
//   clearTable();
//   dbCategory.forEach(createRow);
// };

// const delCategory = (event) => {
//   if (event.target.type == "button") {
//     const [action, index] = event.target.id.split("-");
//     if (action == "delete") {
//       const category = readCategory()[index];
//       const response = confirm(
//         `Deseja realmente excluir a categoria ${category.name}?`
//       );
//       if (response) deleteCategory(index);
//       updateTable();
//     } else {
//       console.log("você não clicou em nada");
//     }
//   }
// };

// updateTable();

// document.getElementById("save").addEventListener("click", saveCategory);

// document
//   .querySelector("#tableCategory>tbody")
//   .addEventListener("click", delCategory);
