import { useState, useEffect } from "react";
import styles from "./Styles/Products.module.css";
import { Link } from "react-router-dom";
function Products(){
    const [ProductsData, setProductsData] = useState([]);
    const [Categories, setCategories] = useState(new Set());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
          .then(res => res.json())
          .then(res => {
            setProductsData(res);
            const temp_set = new Set();
            res.forEach(item => temp_set.add(item.category));
            setCategories(temp_set);
          });
      }, []);
    // useEffect(()=>{
    //     const temp_set = new Set();
    //     ProductsData.map(res => temp_set.add(res.category));
    //     setCategories(temp_set);
    // }, [ProductsData])
    function sortbyPrice(order) {
        if (filteredData.length > 0){
            const sortedData = [...filteredData];
            sortedData.sort((a, b) => {
            if (order === 'highToLow') {
                return b.price - a.price;
            } else {
                return a.price - b.price;
            }
        });
        setFilteredData(sortedData);
        }
        else{

        const sortedData = [...ProductsData];
        sortedData.sort((a, b) => {
          if (order === 'highToLow') {
            return b.price - a.price;
          } else {
            return a.price - b.price;
          }
        });
        setProductsData(sortedData);
    }
    }
    function searchProduct(e){
        const filteredList = ProductsData.filter(elem => elem.title.startsWith(e));
        setFilteredData(filteredList);
    }
    function sortbyCategory(category) {
        const filteredList = ProductsData.filter(elem => elem.category === category);
        setFilteredData(filteredList);
    }
      
      
    return(
        <>
            <div className={styles.parent}>
                <div className={styles.path}>
                    Home / Products
                </div>
                <div className={styles.dataDetails}>
                    {ProductsData.length} Results Found
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.sorting}>
                        <input type="text" className={styles.SearchProduct} placeholder="Search" onChange={(e) => searchProduct(e.target.value)}/>
                        <div className={styles.sortbyPrice}>
                            <div>Sort by Price</div>
                            <select className={styles.priceSort} onChange={(e) => sortbyPrice(e.target.value)}>
                                <option value="highToLow">High to Low</option>
                                <option value="lowToHigh">Low to High</option>
                            </select>
                        </div>
                        <div className={styles.sortbyCategory}>
                            <div>Sort by Category</div>
                            <select className={styles.categorySort} onChange={(e) => sortbyCategory(e.target.value)}>
                                {Categories && Array.from(Categories).map(res => (
                                    <option value={res}>{res}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.products}>
                        {/* {ProductsData ? ProductsData.map(elem => (
                            <div className={styles.product}>
                                <img src={elem.image} className={styles.productImage} alt="" />
                                <div className={styles.productDetails}>
                                    <div className={styles.productName}>
                                        {elem.title}
                                    </div>
                                    <div className={styles.productPrice}>
                                        ${elem.price}
                                    </div>
                                </div>
                                
                            </div>
                        )) : <img className={styles.Loading} src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1262.gif"/>} */}
                        {filteredData.length > 0 ? filteredData.map(elem => (<Link to={`/individual/${elem.id}`}>
                            <div key={elem.id} className={styles.product}>
                                <img src={elem.image} className={styles.productImage} alt="" />
                                <div className={styles.productDetails}>
                                    <div className={styles.productName}>
                                        {elem.title}
                                    </div>
                                    <div className={styles.productPrice}>
                                        ${elem.price}
                                    </div>
                                </div>
                            </div>
                            </Link>
                        )) : ProductsData.map(elem => (<Link to={`/individual/${elem.id}`}>
                        <div key={elem.id} className={styles.product}>
                            <img src={elem.image} className={styles.productImage} alt="" />
                                <div className={styles.productDetails}>
                                    <div className={styles.productName}>
                                        {elem.title}
                                    </div>
                                    <div className={styles.productPrice}>
                                        ${elem.price}
                                    </div>
                                </div>
                        </div>
                        </Link>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
}
export default Products;
