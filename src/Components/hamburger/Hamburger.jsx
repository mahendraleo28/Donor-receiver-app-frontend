import "./hamburger.css"
import { Link } from "react-router-dom"
export default function Hamburger() {
    return (
        <div>
            <header  className="navigationbarbutton"></header>
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        {/* <Link to="/users"><h3>Home</h3></Link> */}
                    </ul>
                    
                </div>
               
            </nav>
            <div className="sdkjfsdkufgdf">
                <Link to='/'>
                        <button className="logout">Logout</button>
                    </Link>
                    </div>
        </div>
    )
}