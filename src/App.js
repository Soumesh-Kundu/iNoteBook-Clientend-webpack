import {useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/LogIn";
import Navbar from './components/Navbar'
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (header,messege, type) => {
    setAlert(
      {
        heading:header,
        msg: messege,
        type: type
      }
    )
    setTimeout(() => {
      setAlert(null)
    }, 2200)
  }
  return (
    <div className="App">
      <NoteState alert={showAlert} >
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} />
              <Route path='/signup' element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
