import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Search from "./Components/Users/search";
import Alert from "./Components/Layout/Alert";
import axios from "axios";
//eslint-disable-next-line
import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./Components/Pages/About";
const App = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  let githubClientId;
  let githubClientSecret;

  if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  }
  else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }

  /*useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
    //eslint-disable-next-line
  }, []);

  //Fetch users on page load
  const getUsers = async () => {
    const res =
      await axios.get(`https://api.github.com/users?client_id=${githubClientId}
    &client_secret=${githubClientSecret}`);
    setUsers(res.data);
  };*/

  //Search a particular user
  const searchUsers = async (text) => {
    setLoading(true);
    const res =
      await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}
    &client_secret=${githubClientSecret}`);
    setUsers(res.data.items);
    setLoading(false);
  };

  //Clear search results
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type }); //we can also write as 'setAlert({msg, type})' bcz both property & value have same name
    setTimeout(() => setAlert(null), 3000);
  };

  //Get a single user's profile
  const getUser = async (username) => {
    setLoading(true);
    const res =
      await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}
    &client_secret=${githubClientSecret}`);
    setUser(res.data);
    setLoading(false);
  };

  //Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}
    &client_secret=${githubClientSecret}`);
    setRepos(res.data);
    setLoading(false);
  };
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/user/:username"
              element={
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
