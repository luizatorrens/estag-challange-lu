import Header from "../components/all/Navbar.jsx";
import FormProduct from "../components/products/formProduct.jsx";
import TableProduct from "../components/products/tableProduct.jsx";

export default function Products() {
  return (
    <>
      <Header />
      <h2 className="text-center mt-5">Add Products</h2>
      <div className="container-fluid">
        <div className="row">
          <FormProduct />
          <TableProduct />
        </div>
      </div>
    </>
  );
}
