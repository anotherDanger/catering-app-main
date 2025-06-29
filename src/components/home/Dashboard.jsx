import Banner from "./Banner";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import OffCanvasCart from "./OffCanvasCart";
import OffCanvasProfile from "./OffCanvasProfile";
import OffCanvasHistory from "./OffCanvasHistory";
function Dashboard(){
    return(
        <div id="dashboard">
            <Banner />
        <Products />
        <About />
        <Footer />
        <OffCanvasHistory />
        <OffCanvasCart />
        <OffCanvasProfile />
        </div>
    )
}

export default Dashboard;