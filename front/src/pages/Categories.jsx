import Header from "../components/Navbar/Navbar.jsx";
import FormCategory from "../components/categories/FormCategoryy.jsx";
import TableCategory from "../components/categories/TableCategoryy.jsx";

export default function Categories() {
  return (
    <>
      <Header />
      <h2 className="text-center mt-5">Add Categories</h2>
      <div className="container-fluid">
        <div className="row">
          <FormCategory />
          <TableCategory />
        </div>
      </div>
    </>
  );
}
