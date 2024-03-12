import Header from "../layout/Navbar.jsx";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost/routes/categories.php"
      );
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await fetch(`http://localhost/routes/categories.php?id=${id}`, {
        method: "DELETE",
      });
      await getCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("tax", tax);
    fetch("http://localhost/routes/categories.php", {
      method: "POST",
      body: data,
    });
    window.location.reload();
  };

  return (
    <>
      <Header />
      <h2 className="text-center mt-5">Add Categories</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <form className="m-5" id="categorytax" onSubmit={addCategory}>
              <label className="label mt-2">Name</label>
              <input
                required
                className="input w-100 mb-2"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <label className="label mt-2">Tax</label>
              <input
                required
                className="input w-100 mb-2"
                min="1"
                placeholder="Tax"
                type="number"
                value={tax}
                name="tax"
                onChange={(e) => setTax(e.target.value)}
              ></input>

              <button className="button mb-2 mt-2" type="submit">
                Save
              </button>
            </form>
          </div>

          <div className="col-lg-6">
            <Table hover className="table m-5 ">
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Name</th>
                  <th scope="col">Tax</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.code}>
                    <td>{category.code}</td>
                    <td>{category.name}</td>
                    <td>{category.tax}</td>
                    <td>
                      <button
                        className="buttonDel"
                        onClick={() => deleteCategory(category.code)}
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
