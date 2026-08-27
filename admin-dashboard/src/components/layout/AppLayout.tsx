import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import styles from "./AppLayout.module.css";

/** Top-level shell: fixed sidebar + scrollable content outlet (SPA area). */
export function AppLayout() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
