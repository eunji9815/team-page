import { NavLink, useLocation } from "react-router-dom";
import { menuConfig } from "../../navigation/menuConfig";
import styles from "./Sidebar.module.css";

/**
 * Pure navigation UI. Renders `menuConfig` as-is — it has no knowledge of
 * page content or data, only of the menu/submenu structure and which path
 * is currently active (derived from the URL via react-router).
 */
export function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar} aria-label="주 메뉴">
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandName}>Admin Analytics</span>
      </div>

      <nav className={styles.nav}>
        {menuConfig.map((menu) => {
          const isMenuActive = location.pathname.startsWith(menu.path);
          return (
            <div key={menu.id} className={styles.menuItem}>
              <NavLink
                to={menu.children ? menu.children[0].path : menu.path}
                className={() =>
                  `${styles.menuLink} ${isMenuActive ? styles.menuLinkActive : ""}`
                }
              >
                {menu.label}
              </NavLink>

              {menu.children && isMenuActive ? (
                <div className={styles.subNav}>
                  {menu.children.map((sub) => (
                    <NavLink
                      key={sub.id}
                      to={sub.path}
                      className={({ isActive }) =>
                        `${styles.subMenuLink} ${isActive ? styles.subMenuLinkActive : ""}`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
