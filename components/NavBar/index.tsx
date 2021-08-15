import { ReactChild, ReactNode } from "react";
import { Link } from "react-scroll";

import styles from './NavBar.module.scss';

export type NavBarItems = [ReactNode, string][];

interface Props {
  items: NavBarItems;
}

const NavBar = ({
  items,
}: Props) => {
  return (
    <nav className={styles.container}>
      <ul style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${items.length}, max-content)`,
      }} className={styles.list}>
        {items.map(([label, to], i) => <li className={styles.item} key={i}><Link to={to} spy smooth color="white">{label}</Link></li>)}
      </ul>
    </nav>
  );
};

export default NavBar;
