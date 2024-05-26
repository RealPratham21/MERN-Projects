import styles from "./Styles/NavBar.module.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function NavBar(){
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    useEffect(() => {
        const storedName = localStorage.getItem("Name");
        if (storedName) {
            setuserName(storedName);
        }
    }, []);
    function LogOut(){
        localStorage.removeItem("Name");
        localStorage.removeItem("Password");
        setuserName('');
        setpassword('');
    }
    return(
        <>
            <div className={styles.parent}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRngX03V9UxcG4u56dfQM5UtFSq10EyMXphmthfrKf__lkbUxILgpLRE_k1Bgmcils8T6Q&usqp=CAU" alt="Urban Market Logo" className={styles.logo} />
                <div className={styles.pages}>
                    <div className={styles.PageOps}><Link to="/">Home</Link></div>
                    <div className={styles.PageOps}><Link to="/about">About</Link></div>
                    <div className={styles.PageOps}><Link to="/products">Products</Link></div>
                </div>
                <div className={styles.login}>
                    <div className={styles.loginOps}><Link to="/cart">Cart</Link></div>
                    {userName ? <div className={styles.loginOps}>Welcome {userName}</div> : <div className={styles.loginOps}><Link to="/signin">Login</Link></div>}
                    {userName && <div className={styles.loginOps} onClick={LogOut}>Logout</div>}
                </div>
            </div>
        </>
    );
}
export default NavBar;