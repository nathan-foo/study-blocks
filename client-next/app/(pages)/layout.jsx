import Navbar from "./_components/Navbar";

const PageLayout = ({ children }) => {
    return ( 
        <div>
            <main>
                <Navbar />
                {children}
            </main>
        </div>
     );
}
 
export default PageLayout;