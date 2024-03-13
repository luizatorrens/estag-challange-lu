import Header from "../components/all/Navbar.jsx";
import FormCategory from "../components/categories/formCategory.jsx";
import TableCategory from "../components/categories/tableCategory.jsx";

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
