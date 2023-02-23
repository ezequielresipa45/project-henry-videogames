import React from 'react';
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png"
import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <div className={styles.containerNav}>
<Link to={`/`} ><img src={logo} alt="Logo"  width={400}/></Link>



       

            <Link to={`/home`} ><p>Home</p></Link>
            <Link to={`/form`} ><p>Add VideoGame</p></Link>

        

        </div>
    )
}
