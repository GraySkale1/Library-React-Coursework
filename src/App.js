import './App.css';
import Profile from './Profile';
import Login from './Login';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
//import Register from './Registerpage';



function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
      </nav>
      <Routes>
        <Route path="/" element={<Profile />}  />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
