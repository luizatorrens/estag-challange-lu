import Header from "../layout/Navbar.jsx";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
 
export default function History() {
  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (order) => {
    setSelectedOrder(order);
    setShow(true);
  };
 
  const [orders, setOrders] = useState([]);
  const [ordersItems, setOrdersItems] = useState([]);
 
  const getOrders = async () => {
    try {
const response = await axios.get("http://localhost/routes/orders.php");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  const getOrdersItems = async () => {
    try {
const response = await axios.get("http://localhost/routes/orderItem.php");
      setOrdersItems(response.data);
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
{order.tax}</td>
                <td>
                  <Button
                    type="button"
                    className="button w-50 d-grid"
                    variant="primary"
                    onClick={() => handleShow(order)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3">
            <Table striped hover className="table">
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
                {ordersItems
                  .filter((item) => item.order_code === selectedOrder.code)
                  .map((orderItem) => (
                    <tr key={orderItem.code}>
                      <td>{orderItem.code}</td>
                      <td>{orderItem.product_code}</td>
                      <td>{orderItem.amount}</td>
                      <td>{orderItem.price}</td>
{orderItem.tax}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}