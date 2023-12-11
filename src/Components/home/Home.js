import './home.css';
import Hamburger from "../hamburger/Hamburger";

export default function Home() { 
    return(
        <div className="main-home">
            <Hamburger/>
            <div className='navbarinhome'>
                <h3 className='text'>Welcome! successfully LoggedIn!</h3>
            </div>
        </div>
    )
}