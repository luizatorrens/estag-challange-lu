import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

export default function Header() {
  return (
    <ul>
      <li>
        <Link className={styles.nav} to="/">
          Suite Store
        </Link>
      </li>
      <li>
        <Link className={styles.nav} to="/products">
          Products
        </Link>
      </li>
      <li>
        <Link className={styles.nav} to="/categories">
          Categories
        </Link>
      </li>
      <li>
        <Link className={styles.nav} to="/history">
          History
        </Link>
      </li>
    </ul>
  );
}

