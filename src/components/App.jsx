import React from 'react';
import '../App.css';
import Header from './header/header';
import { Switch, Route, useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";


import MainPage from './mainPage';
import AboutPage from './AboutPage';

// const history = createBrowserHistory();


function App() {

  const history = useHistory();
  // console.log(history);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/:state" render={(props) => <MainPage {...props} />} />

      </Switch>
    </div>
  );
};

export default App;
