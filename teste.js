import Header from "../layout/Navbar.jsx";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
 
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
 
  const getCategories = async () => {
    try {
const response = await axios.get("http://localhost/routes/categories.php");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    getCategories();
  }, []);
 
  const deleteCategory = async (id) => {
    try {
await axios.delete(`http://localhost/routes/categories.php?id=${id}`);
      getCategories();
    } catch (error) {
      console.error(error);
    }
  };
 
  const addCategory = async (e) => {
    e.preventDefault();
    try {
await axios.post("http://localhost/routes/categories.php", {
        name: name,
        tax: tax
      });
      getCategories();
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="text-center">Add Categories</h2>
            <form onSubmit={addCategory}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tax</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Tax"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Save
              </button>
            </form>
          </div>
          <div className="col-lg-6">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Tax</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.code}>
                    <td>{category.code}</td>
{category.name}</td>
{category.tax}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteCategory(category.code)}
                      >
                        Delete
                      </Button>
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