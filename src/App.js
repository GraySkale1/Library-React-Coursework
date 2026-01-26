import './App.css';
import Profile from './Profile';
import Login from './Login';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Logout from './Logout';
//import Register from './Registerpage';



function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/logout">Log Out</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Profile />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
