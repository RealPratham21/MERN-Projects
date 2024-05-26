import { useEffect, useState } from "react";
import styles from "./Styles/Cart.module.css";
function Cart(){
    const [data, setdata] = useState([]);
    const [totalCost, settotalCost] = useState(0);
    useState(()=>{
        if (localStorage.getItem("Name") && localStorage.getItem("Password")){
            fetch("http://localhost:3080/getCart", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body : (JSON.stringify({
                Name: localStorage.getItem("Name"),
                Password: localStorage.getItem("Password")
            }))
        }).then(res => res.json()).then(res => setdata(res.Items));
        }
        else{
            window.alert("Login First!");
        }
    }, [])
    useEffect(()=>{
        let cost = 0;
        data.forEach(elem => {
            cost += (elem.price * elem.quantity);
        })
        settotalCost(cost);
    }, [data])
    function deleteItem(id){
        let newArr = [...data]
        newArr = newArr.filter(elem => elem.id != id)
        setdata(newArr);
        fetch("http://localhost:3080/deleteItem", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body : (JSON.stringify({
                Name: localStorage.getItem("Name"),
                Password: localStorage.getItem("Password"),
                Item: id
            }))
        }).then(res => res.json()).then(res => console.log(res));
    }
    function clearCart(){
        setdata([])
        fetch("http://localhost:3080/clearCart", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body : (JSON.stringify({
                Name: localStorage.getItem("Name"),
                Password: localStorage.getItem("Password"),
            }))
        }).then(res => res.json()).then(res => console.log(res));
    }
    return(
        <>
            <div className={styles.parent}>
                <div className={styles.path}>
                    Home / Cart
                </div>
                <div className={styles.cart}>
                    <div className={styles.items}>
                        <div className={styles.headings}>
                            <div className={styles.Head}>Item</div>
                            <div className={styles.Price}>Price</div>
                            <div className={styles.Quantity}>Quantity</div>
                            <div className={styles.Subtotal}>Subtotal</div>
                        </div>
                        {data ? data.map(elem => (
                            <div className={styles.product}>
                            <div className={styles.productItem}><img src={elem.image} className={styles.productImage} alt="Product Image" />
                            {/* <div className={styles.productName}>{elem.title}</div> */}
                            </div>
                            <div className={styles.productPrice}>
                                ${elem.price}
                            </div>
                            <div className={styles.productQuantity}>
                                {elem.quantity}
                            </div>
                            <div className={styles.productTotal}>
                                ${Number(elem.price) * Number(elem.quantity)}
                            </div>
                            <div className={styles.delete} onClick={() => deleteItem(elem.id)}>
                                ❌
                            </div>
                            </div>
                        )) : <div className={styles.EmptyCart}>Your Cart is Empty 😭</div>}
                    </div>
                    <div className={styles.cartOps}>
                        <button className={styles.clearCart} onClick={clearCart}>
                            Clear Shopping Cart
                        </button>
                    </div>
                    <div className={styles.billing}>
                        <div className={styles.billBox}>
                            <div className={styles.subTotal}>Total Cost: ${totalCost}</div>
                            <div className={styles.shipping}>Shipping Cost: $4.99</div>
                            <hr />
                            <div className={styles.totalPrice}>
                                Order Total: ${(totalCost + 4.99).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cart;