import styles from "./Styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
function Home(){
    const [featured, setfeatured] = useState([]);
    const EmailInput = useRef();
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products?limit=3')
            .then(res=>res.json())
            .then(res => setfeatured(res))
    })
    function sendEmail(){
        console.log(EmailInput.current.value);
        fetch("http://localhost:3080/sendEmail", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                Email: EmailInput.current.value
            })
        }).then(res => res.json()).then(res => console.log(res));
    }
    return(
        <>
            <div className={styles.parent}>
                <div className={styles.intro}>
                    <div className={styles.introText}>
                        <div className={styles.introHead}>
                            Design your Comfort Zone
                        </div>
                        <div className={styles.introParagraph}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?
                        </div>
                        <Link to="/products"><button className={styles.shopBtn}>
                            SHOP NOW
                        </button></Link>
                        
                    </div>
                    <img src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg" alt="" className={styles.introImage}/>
                </div>
                <div className={styles.featured}>
                    <div className={styles.featuredHeading}>
                        Featured Products
                    </div>
                    <div className={styles.featuredItems}>
                        {featured && featured.map(elem => (
                        <Link to={`/individual/${elem.id}`}>
                        <div className={styles.featuredItem}>
                            <img src={elem.image} className={styles.featuredImage} alt="" />
                            <div className={styles.featuredDetails}>
                                <div className={styles.featuredName}>{elem.title}</div>
                                <div className={styles.featuredPrice}>${elem.price}</div>
                            </div>
                        </div>
                        </Link>
                    ))}
                    </div>
                    
                </div>
                <div className={styles.custom}>
                    <div className={styles.customUp}>
                        <div className={styles.customUpHead}>
                        Custom Furniture
                        Built Only For You
                        </div>
                        <div className={styles.customUpParagraph}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.
                        </div>
                    </div>
                    <div className={styles.customDown}>
                        <div className={styles.mision}>
                            <i className="fa-regular fa-compass"></i>
                            <div className={styles.missionHead}>
                                Mission
                            </div>
                            <div className={styles.missionParagraph}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi
                            </div>
                        </div>
                        <div className={styles.vision}>
                            <i class="fa-solid fa-leaf"></i>
                            <div className={styles.visionHead}>
                                Vision
                            </div>
                            <div className={styles.visionParagraph}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi
                            </div>
                        </div>
                        <div className={styles.history}>
                            <i class="fa-solid fa-globe"></i>
                            <div className={styles.historyHead}>
                                History
                            </div>
                            <div className={styles.historyParagraph}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.newsletter}>
                    <div className={styles.newsletterInfo}>
                        <div className={styles.newsletterInfoHead}>
                        Join our newsletter and get 20% off
                        </div>
                        <div className={styles.newsletterInfoParagraph}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?
                        </div>
                    </div>
                    <div className={styles.newsletterForm}>
                        <input type="text" className={styles.emailBox} placeholder="Enter Email" ref={EmailInput}/>
                        <button className={styles.subscribe} onClick={sendEmail}>Subscribe</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;