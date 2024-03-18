import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function HistoryTable() {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const handleClose = () => setShow(false);
  const [orders, setOrders] = useState([]);
  const [ordersItems, setOrdersItems] = useState([]);


  const showDetails = (id) => {
    setShow(true);
    let data = ordersItems.filter((order) => order.order_code == id);
    setDetails(data);
  };

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost/routes/orders.php");
      const data = response.data;
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrdersItems = async () => {
    try {
      const response = await axios.get("http://localhost/routes/orderItem.php");
      const data = response.data;
      setOrdersItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
    getOrdersItems();
  }, []);
  return (
    <>
      <Table hover  className="table col-12 m-5">
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
                <Button
                  type="button"
                  className="button w-50 d-grid"
                  variant="primary"
                  onClick={() => showDetails(order.code)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="m-3">
              <Table  hover className="table-hover">
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Product Code</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Price</th>
                    <th scope="col">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {details?.map((orderItem) => (

                        <tr key={orderItem.code}>
                  
                          <td>{orderItem.code}</td>
                          <td>{orderItem.product_code}</td>
                          <td>{orderItem.amount}</td>
                          <td>{orderItem.price}</td>
                          <td>{orderItem.tax}</td>
                        </tr>
          


                  ))}
                      
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>
      </Table>
    </>
  );
}
