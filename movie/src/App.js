import React,{Component} from 'react';
import {HashRouter, Route} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Nav from "./component/Nav";
import Detail from "./routes/Detail";
import "./App.css";


function App(){
    return (
      <HashRouter>
        <Nav></Nav>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/movie/:id" component={Detail}></Route>
      </HashRouter>
    );
}

export default App;