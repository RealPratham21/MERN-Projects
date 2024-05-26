// UserName: ftwprathambhamare7 Password: nkf2onecQRtEquHH
import { useRef, useState } from "react";
import styles from "./Styles/SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
function Signin() {
    const UserName = useRef();
    const Password = useRef();
    const navigate = useNavigate();
    const [FixUserName, setFixUserName] = useState();
    const [FixPassword, setFixPassword] = useState();
    function checkUser() {
        if (UserName.current.value.length > 0 && Password.current.value.length > 7){
            fetch("http://localhost:3080/checkUser", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    Name: UserName.current.value,
                    Password: Password.current.value
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data); // Log the parsed JSON data
                if (data.message == "Present"){
                    setFixUserName(UserName.current.value);
                    setFixPassword(Password.current.value);
                    localStorage.setItem("Name", data.Name);
                    localStorage.setItem("Password", data.Password);
                    window.alert("Login Successful!");
                    navigate('/');
                }
                else{
                    window.alert("Login Failed!");
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
        else{
            window.alert("Username needs to be atleast 1 character long and Password needs to be atleast 8 characters long")
        }
    }    
    return (
        <>
            <div className={styles.parent}>
                <div className={styles.LoginBox}>
                    <div className={styles.LoginAbout}>
                        <div className={styles.brand}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRngX03V9UxcG4u56dfQM5UtFSq10EyMXphmthfrKf__lkbUxILgpLRE_k1Bgmcils8T6Q&usqp=CAU" className={styles.logo} alt="Logo" />
                            <div>
                                Urban Market
                            </div>
                        </div>
                        <div className={styles.info}>
                            Login into Urban Market to get started with shopping.
                        </div>
                    </div>
                    <div className={styles.LoginComponents}>
                        <div className={styles.instruction}>
                            <div className={styles.heading}>Login to your Account</div>
                            <div className={styles.signup}>Don't have an account? <Link to="/signup">Sign up Free!</Link></div>
                        </div>
                        <div className={styles.forms}>
                            <input type="text" className={styles.Name} placeholder="Name" ref={UserName}/>
                            <input type="password" className={styles.Password} placeholder="Password" ref={Password}/>
                        </div>
                        <div className={styles.loginBtn}>
                            <button className={styles.btn} onClick={checkUser}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signin;
