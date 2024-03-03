import Login from './Login'
import Registration from './Registration'
import { useState } from 'react'
import styles from './auth.module.css'

function Auth() {
    const [clicked,set]=useState(false);
    return (
        <div className={`${clicked?styles.expand:styles.container}`}>
        {clicked? <Registration set={set}/>:<Login set={set}/>}
        </div>
    )
}
export default Auth