import { Toaster } from "react-hot-toast";
import Navbar from "./_components/Navbar";
import MobileNavbar from "./_components/MobileNavbar";

const PageLayout = ({ children }) => {
    return ( 
        <div>
            <main>
                <Toaster />
                <Navbar />
                <MobileNavbar />
                {children}
            </main>
        </div>
     );
}
 
export default PageLayout;