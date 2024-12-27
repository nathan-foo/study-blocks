import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }) => {
    return ( 
        <div>
            <main>
                <Navbar />
                {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;