import Header from "../layout/Navbar.jsx";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
// import axios from "axios";

export default function Home() {
  const [values, setValues] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [productData, setProductData] = useState({
    price: "",
    tax: "",
  });
  const [carrinhoTemp, setCarrinhoTemp] = useState([]);

  useEffect(() => {
    fetch("http://localhost/routes/products.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
    showInput();
  }, [selectedProduct, amount]);

  const changeProduct = (event) => {
    setSelectedProduct(event.target.value);
  };

  const changeAmount = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const showInput = async () => {
    const response = await fetch("http://localhost/routes/products.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);
    if (product) {
      const tax_value = product.tax_value;
      const price = product.price;
      const totalTax = (tax_value * price * amount) / 100;
      const totalPrice = price * amount;
      setProductData({
        price: totalPrice.toFixed(2),
        tax: totalTax.toFixed(2),
      });
    }
  };

  const saveBuy = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/routes/products.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);

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

        setCarrinhoTemp([...carrinhoTemp, buy]);
      } else {
        alert(
          `Sem estoque suficiente para essa quantidade! Digite um valor menor que ${product.amount}!`
        );
      }
    } else {
      alert("Este produto foi adicionado ao carrinho anteriormente.");
    }
    console.log(carrinhoTemp);
  };

  return (
    <>
      <Header />
      <div className="m-5">
        <h2 className="text-center">Add to cart</h2>
        <div className="container row">
          <div className="col-6">
            <form onSubmit={saveBuy} className="mt-5 ">
              <select
                id="selectProducts"
                onChange={changeProduct}
                className="select w-100 mt-2 mb-2"
                aria-label="Default select example"
              >
                <option>Select a Product</option>
                {values.map((opts, i) => (
                  <option key={i} value={opts.code}>
                    {opts.name}
                  </option>
                ))}
              </select>
              <input
                className="input w-100 mt-2 mb-2"
                min="1"
                placeholder="Amount"
                type="number"
                id="amount"
                value={amount}
                onChange={changeAmount}
              ></input>
              <input
                className="input w-100 mt-2 mb-2"
                placeholder="Tax"
                readOnly
                disabled
                id="tax"
                value={productData.tax}
              ></input>
              <input
                className="input w-100 mt-2 mb-2"
                placeholder="Price"
                readOnly
                disabled
                id="price"
                value={productData.price}
              ></input>
              <button type="submit" className="button mt-2 mb-2">
                Add to cart
              </button>
            </form>
          </div>

          <div className="col-6">
            <Table hover className="table m-5">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Tax</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {carrinhoTemp.map((item, index) => (

                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.tax}</td>
                  <td>{item.total}</td>
                  <td>
                    <button className="buttonDel">
                      <svg viewBox="0 0 448 512" className="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>

                ))}
              </tbody>
            </Table>

            <div className="col-2 position-absolute bottom-0 end-0 m-5">
              <input
                type="text"
                name=""
                id=""
                className="form-control mb-3"
                placeholder="Total Tax"
                disabled
                readOnly
              />
              <input
                type="text"
                name=""
                id=""
                className="form-control mb-3"
                placeholder="Total"
                disabled
                readOnly
              />
              <div className="d-flex ">
                <button type="button" className=" button d-grid me-1">
                  Cancel
                </button>
                <button type="button" className=" button d-grid  ">
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
