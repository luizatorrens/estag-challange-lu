import Header from "../layout/Navbar.jsx";
// import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";

export default function History() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost/routes/orders.php");
      const data = response.data;
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="m-5">
        <Table hover className="table col-12 m-5">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Total Price</th>
              <th scope="col">Tax</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.code}>
                <td>{order.code}</td>
                <td>{order.total}</td>
                <td>{order.tax}</td>
                <td>
                  {/* <Link to="/details"> */}
                    <button type="button" className="button w-50 d-grid  ">
                      Details
                    </button>
                  {/* </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
