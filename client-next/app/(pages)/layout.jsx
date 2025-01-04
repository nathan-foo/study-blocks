import { Toaster } from "react-hot-toast";
import Navbar from "./_components/Navbar";

const PageLayout = ({ children }) => {
    return ( 
        <div>
            <main>
                <Toaster />
                <Navbar />
                {children}
            </main>
        </div>
     );
}
 
export default PageLayout;