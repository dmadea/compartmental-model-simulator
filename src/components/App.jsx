import React from 'react';
import '../App.css';
import Header from './header';
import { Switch, Route } from "react-router-dom";

import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import MainPage from './mainPage';


function App() {

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/about">
          {"about page"}
          <BlockMath math={"a = b = c = d"} errorColor={'#cc0000'} />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
