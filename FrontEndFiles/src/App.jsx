import NavBar from "./NavBar";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import styles from "./Styles/App.module.css"
import Footer from "./Footer";
import Products from "./Products";
import Individual from "./Individual";
import Cart from "./Cart"
import About from "./About";
function App(){
  return(
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/individual/:id' element={<Individual />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;