import { ReactChild } from "react";

import styles from './NavBar.module.scss';

export type NavBarItems = ReactChild[];

interface Props {
  items: NavBarItems;
}

const NavBar = ({
  items,
}: Props) => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {items.map((item, i) => <li className={styles.item} key={i}>{item}</li>)}
      </ul>
    </nav>
  );
};

export default NavBar;
