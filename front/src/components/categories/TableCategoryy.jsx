import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ButtonDel from "../ButtonDel/ButtonDel";

export default function TableCategory() {
  const [categories, setCategories] = useState([]);

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

  return (
    <>
      <div className="col-lg-6">
        <Table hover className="table m-5 ">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.code}>
                <td>{category.code}</td>
                <td>{category.name}</td>
                <td>{category.tax}</td>
                <td>
                  <ButtonDel
                    onClick={() => deleteCategory(category.code)}
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