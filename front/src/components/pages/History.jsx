import Header from "../layout/Navbar.jsx";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default function History() {
  return (
    <>
      <Header />
      <div className="m-5">
      <Table hover className="table col-12 m-5">
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
                    <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td> <Link to='/details'> <button type="button" className=" button w-50 d-grid " >Details</button> </Link> </td>
                    </tr>
                    <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td> <Link to='/details'> <button type="button" className="button w-50 d-grid" >Details</button> </Link> </td>
                    </tr>
                    <tr>
                    <td >Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td> <Link to='/details'> <button type="button" className="button w-50 d-grid  " >Details</button> </Link> </td>
                    </tr>
                </tbody>
             </Table>
             </div>
    </>
  );
}