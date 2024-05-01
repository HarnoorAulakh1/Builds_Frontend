import { Outlet } from "react-router-dom"
import styles from "./Messages.module.css"

function MessageLayout() {
    return (
        <div className={styles.layout}>
        <Outlet />
        </div>
    )
}
export default MessageLayout