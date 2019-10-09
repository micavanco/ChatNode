import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";

function App() {
  return (
    <BrowserRouter>
      <main className="main-container">
        <Switch>
          <Route path="/" exact component={MainView}/>
          <Route path="/login" exact component={LoginView}/>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
