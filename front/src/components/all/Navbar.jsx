import { Link } from "react-router-dom";

export default function Header() {
  return (
    <ul>
      <li>
        <Link className="nav-link" to="/">
          Suite Store
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/products">
          Products
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/categories">
          Categories
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/history">
          History
        </Link>
      </li>
    </ul>
  );
}

// import { Link } from "react-router-dom";
// import Nav from 'react-bootstrap/Nav';

// export default function Header() {
//   return (
//     <>
//       <Nav className="navbar navbar-expand-lg  text-body-light d-flex"style={{ background: "#6d65fe" }}>

//         <div className="collapse navbar-collapse justify-content-start fs-5 fw-medium" id="navbarNav">
//           <ul className="navbar-nav nav nav-underline">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Suite Store
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">
//                 Products
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/categories">
//                 Categories
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/history">
//                 History
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </Nav>
//     </>
//   );
// }
