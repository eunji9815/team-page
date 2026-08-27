import { NavLink } from "react-router-dom";
import type { SubMenuItem } from "../../navigation/menuConfig";
import styles from "./SubNavigation.module.css";

export interface SubNavigationProps {
  items: SubMenuItem[];
}

/** Renders a menu's sub-menu items as clickable tabs backed by real routes. */
export function SubNavigation({ items }: SubNavigationProps) {
  return (
    <nav className={styles.tabs} aria-label="하위 메뉴">
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ""}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
