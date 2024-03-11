import Header from "../layout/Navbar.jsx";

import Table from "react-bootstrap/Table";

export default function Details() {
  return (
    <>
      <Header />
      <div className="m-5">
      <Table hover className="table col-12 m-5">
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
                    <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td >Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
             </Table>
             </div>
    </>
  );
}
