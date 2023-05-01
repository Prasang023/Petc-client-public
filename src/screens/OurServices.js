import { Link } from "react-router-dom";

import Header from "../ui/Header/matnavbar";
import Footer from "../ui/Footer/Footer";

const OurServices = () => {
    return ( 
        <div style={{textAlign:'center'}}>
            This is our services page
            <br />
            <Link to='/vetuser'>Vet Appointment</Link>
        </div>
     );
}
 
export default OurServices;