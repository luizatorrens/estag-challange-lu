import Header from "../layout/Navbar.jsx";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost/routes/products.php");
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (code) => {
        await fetch(`http://localhost/routes/products.php?code=${code}`, {
        method: 'DELETE',
      }),
    window.location.reload()
  };

  const addProduct = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("amount", amount);
    data.append("price", price);
    data.append("category", category);
    fetch("http://localhost/routes/products.php", {
      method: "POST",
      body: data,
    }).then(getProducts());
    window.location.reload()
  };

  useEffect(() => {
    getProducts();
    fetch("http://localhost/routes/categories.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);

  return (
    <>
      <Header />
      <div className="m-5">
        <h2 className="text-center">Add Products</h2>
        <div className="container row ">
          <div className="col-6">
            <form className="m-5" onSubmit={addProduct}>
              <select
                className="select w-100 mb-2 mt-2"
                aria-label="Default select example"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>Select a Category</option>
                {values.map((opts, i) => (
                  <option key={i} value={opts.code}>
                    {opts.name}
                  </option>
                ))}
              </select>
              <input
                className="input w-100 mb-2 mt-2"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input
                className="input w-100 mb-2 mt-2"
                min="1"
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></input>
              <input
                className="input w-100 mb-2 mt-2"
                min="1"
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
              <button
                type="submit"
                className="button mb-2 mt-2"
              >
                Save
              </button>
            </form>
          </div>

          <div className="col-6">
            <Table hover className="table m-5">
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">UnitPrice</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.code}>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.amount}</td>
                    <td>{product.price}</td>
                    <td>{product.category_name}</td>
                    <td>
                      <button
                        className="buttonDel"
                        onClick={() => deleteProduct(product.code)}
                      >
                        <svg viewBox="0 0 448 512" className="svgIcon">
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
