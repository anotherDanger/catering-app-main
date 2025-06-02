import Banner from "./Banner";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import OffCanvasCart from "./OffCanvasCart";
import OffCanvasProfile from "./OffCanvasProfile";
function Dashboard(){
    return(
        <div id="dashboard">
            <Banner />
        <Products />
        <About />
        <Footer />
        <OffCanvasCart />
        <OffCanvasProfile />
        </div>
    )
}

export default Dashboard;