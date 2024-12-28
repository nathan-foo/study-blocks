import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

const PageLayout = ({ children }) => {
    return ( 
        <div>
            <main>
                <Navbar />
                {children}
                <Footer />
            </main>
        </div>
     );
}
 
export default PageLayout;