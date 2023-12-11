import { Route, Routes } from "react-router-dom";
import Registration from '../Components/Registration/Registration';
import Login from '../Components/Login/Login';
import Home from '../Components/home/Home';
import Donor from "../Components/Donor/Donor";
import Reciever from "../Components/Reciever/Reciever";

export const AppRoutes = () => {
    return(
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/users">
          <Route index element={<Home />} />
          </Route>
          <Route path="/Donor" element={<Donor/>}/>
          <Route path="/Reciever" element={<Reciever/>}/>
        </Routes>
      </div>
    );
  };
  