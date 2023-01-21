import React,{useState} from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Postpost from "./components/Postpost";
import SuccessAlert from "./components/SuccessAlert";

function App() {
  const [create, setCreate] = useState(false);
  const [success,setSuccess] = useState(false);
  return (<>
  <NavBar create={create} setCreate={setCreate}/>
  <Outlet/>
  {create?<Postpost setCreate={setCreate} setSuccess={setSuccess}/>:""}
  {success?<SuccessAlert setSuccess={setSuccess}/>:""}
  </>);
}

export default App;
