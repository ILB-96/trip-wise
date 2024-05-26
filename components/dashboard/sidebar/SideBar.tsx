"use client";
import React from "react";
import styles from "./sidebar.module.css";
import { menuItems } from "./menuItems";
import MenuLink from "./menuLink/MenuLink";
const Sidebar = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
