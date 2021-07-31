import { ReactChild } from "react";
import { Link } from "react-scroll";

import styles from './NavBar.module.scss';

export type NavBarItems = string[][];

interface Props {
  items: NavBarItems;
}

const NavBar = ({
  items,
}: Props) => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {items.map(([label, to], i) => <li className={styles.item} key={i}><Link to={to} spy smooth color="white">{label}</Link></li>)}
      </ul>
    </nav>
  );
};

export default NavBar;
