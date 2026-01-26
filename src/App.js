import './App.css';
import Profile from './Profile';
import Login from './Login';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Logout from './Logout';
import Search from './Search';
//import Register from './Registerpage';



function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/logout">Log Out</Link> |{" "}
        <Link to="/search">Search</Link> |{" "}
      </nav>
      <Routes>
        <Route path="/" element={<Profile />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
