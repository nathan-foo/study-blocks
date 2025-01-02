import { ToastContainer } from "react-toastify";
import Navbar from "./_components/Navbar";

const PageLayout = ({ children }) => {
    return ( 
        <div>
            <main>
                <Navbar />
                {children}
                <ToastContainer />
            </main>
        </div>
     );
}
 
export default PageLayout;