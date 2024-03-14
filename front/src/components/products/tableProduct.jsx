import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonDel from "../ButtonDel/ButtonDel";

export default function TableProduct() {
  const [products, setProducts] = useState([]);

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
      method: "DELETE",
    }),
      await getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="col-lg-6">
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
                  <ButtonDel
                    onClick={() => deleteProduct(product.code)}
                  />

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
