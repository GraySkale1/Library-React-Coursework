import './App.css';
import Login from './Login';
import Register from './Registerpage';

function App() {
  localStorage.clear()
  localStorage.setItem("username")
  return (
    <>
    <Login/>
    <Register/>
    </>
  );
}

export default App;
