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

