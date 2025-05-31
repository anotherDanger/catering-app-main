import Banner from "./Banner";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import OffCanvasCart from "./OffCanvasCart";
import OffCanvasProfile from "./OffCanvasProfile";
function Dashboard(){
    return(
        <>
        <Banner />
        <Products />
        <About />
        <Contact />
        <Footer />
        <OffCanvasCart />
        <OffCanvasProfile />
        </>
    )
}

export default Dashboard;