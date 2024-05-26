import { useEffect, useState } from "react";
import styles from "./Styles/Individual.module.css";
import { Link, useParams } from "react-router-dom";
function Individual(){
    const [data, setdata] = useState();
    const { id } = useParams();
    const [counter, setcounter] = useState(1);
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(res => setdata(res));
    }, [])
    function subtract(){
        if (counter-1 > 0){
            setcounter(counter-1);
        }
    }
    function Add(){
        setcounter(counter+1);
    }
    function addtoCart(){
        const updatedData = {...data, quantity: counter};
        console.log(data);
        fetch("http://localhost:3080/addtoCart", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                Name: localStorage.getItem("Name"),
                Password: localStorage.getItem("Password"),
                ItemDetails: updatedData
            })
        }).then(res => res.json()).then(res => console.log(res));
    }
    return(
        <>
            <div className={styles.parent}>
                <div className={styles.path}>
                    Products / {data && data.title}
                </div>
                <div className={styles.backBtn}>
                    <button><Link to="/products">Back to Products</Link></button>
                </div>
                {data && <div className={styles.productInfo}>
                    <img src={data.image} className={styles.productImage} alt="Product Image" />
                    <div className={styles.productDetail}>
                        <div className={styles.productName}>{data.title}</div>
                        <div className={styles.Ratings}>{data.rating.rate} / 5 ( {data.rating.count} )</div>
                        <div className={styles.productPrice}>${data.price}</div>
                        <div className={styles.productCategory}>Category: {data.category}</div>
                        <div className={styles.productDesc}>{data.description}</div>
                        <div className={styles.quantity}>
                            <button className={styles.reduce} onClick={subtract}>-</button>
                            <div className={styles.count}>{counter}</div>
                            <button className={styles.increase} onClick={Add}>+</button>
                        </div>
                        <div className={styles.AddtoCart}>
                            {localStorage.getItem("Name") ?
                            <button className={styles.CartBtn} onClick={addtoCart}>ADD TO CART</button> : <button className={styles.CartBtn}><Link to="/signin">LOGIN TO ADD TO CART</Link></button>}
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
}
export default Individual;