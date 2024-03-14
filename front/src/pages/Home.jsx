import Header from "../components/Navbar/Navbar.jsx";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Input from "../components/Inputs/Input.jsx";
import ButtonDel from "../components/ButtonDel/ButtonDel.jsx";
import Button from "../components/Button/Button.jsx";

export default function Home() {
  const [values, setValues] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState([]);
  const [carrinhoTemp, setCarrinhoTemp] = useState([]);
  const [productData, setProductData] = useState({
    price: "",
    tax: "",
  });
  let sumTax = 0;
  let sumTotal = 0;

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
      const tax_value = product.tax_value / 100;
      const price = product.price;
      const totalTax = tax_value * amount * 100;
      const totalPrice = price * amount;
      setProductData({
        price: totalPrice,
        tax: totalTax,
      });
    }
  };

  function totalTax() {
    carrinhoTemp.forEach((item) => {
      sumTax += item.tax;
    });
  }
  totalTax();

  function totalTotal() {
    carrinhoTemp.forEach((item) => {
      sumTotal += item.total;
    });
  }
  totalTotal();

  const saveBuy = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/routes/products.php");
    const dbProduct = await response.json();
    const product = dbProduct.find((p) => String(p.code) === selectedProduct);

    const tax_value = product.tax_value / 100;
    const price = product.price;

    const totalTax = tax_value * amount * 100;
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
  };

  const cancelBuy = () => {
    const response = confirm(
      "Deseja realmente cancelar o carrinho de compras?"
    );
    if (response);
    setCarrinhoTemp([]);
  };

  const removeRow = (index) => {
    const response = window.confirm(
      "Deseja realmente excluir esse produto do carrinho?"
    );
    if (response) {
      const updatedCarrinhoTemp = [...carrinhoTemp];
      updatedCarrinhoTemp.splice(index, 1);
      setCarrinhoTemp(updatedCarrinhoTemp);
    }
  };

  const finishBuy = async () => {
    let sumTotal = 0;
    let sumTax = 0;
    if (carrinhoTemp.length > 0) {
      carrinhoTemp.forEach((product) => {
        sumTax += parseFloat(product.tax);
        sumTotal += parseFloat(product.price);
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
              total: sumTotal,
              tax: sumTax,
            }),
          }).then(async () => {
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
          setCarrinhoTemp([]);
        } catch (error) {
          console.error(error);
          alert("ocorreu um erro");
        }
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost/routes/products.php")
      .then((data) => data.json())
      .then((val) => setValues(val));
    showInput();
  }, [selectedProduct, amount]);

  return (
    <>
      <Header />
      <h2 className="text-center mt-5">Add to cart</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={saveBuy} className="m-5 ">
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
              <label className="label mt-2">Amount</label>
              <Input
                className="input w-100  mb-2"
                min="1"
                placeholder="Amount"
                type="number"
                id="amount"
                value={amount}
                onChange={changeAmount}
              />
              <label className="label mt-2">Tax</label>
              <Input
                className="input w-100 mb-2"
                placeholder="Tax"
                disabled
                id="tax"
                value={productData.tax}
              />
              <label className="label mt-2">Price</label>
              <Input
                className="input w-100 mb-2"
                placeholder="Price"
                disabled
                id="price"
                value={productData.price}
              />
              <Button type="submit" texto="Add Product"/>
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
                      <ButtonDel onClick={() => removeRow()}/>
              
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="col-2 position-absolute bottom-0 end-0 m-5">
              <label className="label">Total Tax</label>
              <Input
                type="text"
                name=""
                value={sumTax}
                id="totaltax"
                className="form-control mb-3"
                placeholder="Total Tax"
                disabled
                readOnly
              />
              <label className="label">Total</label>
              <Input
                type="text"
                name=""
                value={sumTotal}
                id="totalprice"
                className="form-control mb-3"
                placeholder="Total"
                disabled
                readOnly
              />
              <div className="d-flex  mt-3">
                <button
                  type="button"
                  className=" button d-grid me-1"
                  onClick={() => cancelBuy()}
                  texto="Cancel"
                > Cancel </button>
                <button
                  type="button"
                  className=" button d-grid  "
                  onClick={() => finishBuy()}
                  texto="Finish"
                > Finish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
