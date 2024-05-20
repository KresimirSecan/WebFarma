import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes, NavLink, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Drugs from "./pages/Drugs";
import Drug from "./pages/Drug";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import SearchResults from './pages/SearchResults';
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({ username: "", id: "", status: false });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: "", status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav>
            <div className="nav-left">
              <div className="nav-title">
                <i className="fas fa-pills"></i> WebFarm
              </div>
              <NavLink to="/Drugs" activeClassName="active">Create A Post</NavLink>
              <NavLink to="/" activeClassName="active">Home</NavLink>
            </div>
            <div className="nav-right">
              {authState.status && <span className="username"><Link to={`/profile/${authState.id}`}>{authState.username}</Link></span>}
              {!authState.status ? (
                <>
                  <NavLink to="/login" activeClassName="active">Login</NavLink>
                  <NavLink to="/registration" activeClassName="active">Register</NavLink>
                </>
              ) : (
                <button onClick={logout}>Logout</button>
              )}
            </div>
          </nav>
          <div className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Drugs" element={<Drugs />} />
              <Route path="/drug/:id" element={<Drug />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path ="/searchResults" element={<SearchResults />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
