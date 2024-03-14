import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Inputs/Input";
import Button from "../Button/Button";

export default function FormProduct() {
  const [setProducts] = useState([]);
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
    window.location.reload();
  };

  useEffect(() => {
    getProducts();
    fetch("http://localhost/routes/categories.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
  }, []);
  return (
    <>
      <div className="col-lg-6">
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
          <label className="label mt-2">Product Name</label>
          <Input
            className="input w-100 mb-2 "
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label mt-2">Amount</label>
          <Input
            className="input w-100 mb-2 "
            min="1"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label className="label mt-2">Price</label>
          <Input
            className="input w-100 mb-2 "
            min="1"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button type="submit" texto="Add Product" />
        </form>
      </div>
    </>
  );
}
