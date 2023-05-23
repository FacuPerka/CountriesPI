import React from 'react';
import LandingPage from './components/Landing/landing';
import Home from './components/Home/home';
import ActivityCreate from './components/ActivityCreate/activitycreate';
import ActivitiesList from './components/ActivityList/activitylist';
import Detail from './components/Details/details';
import NotFound from './components/NotFound/notfound';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path = '/' component = {LandingPage}/>
          <Route exact path = '/Home' component = {Home}/>
          <Route exact path = '/Activity' component = {ActivityCreate}/>
          <Route exact path = '/Activities' component = {ActivitiesList}/>
          <Route exact path = '/Home/:id' component = {Detail}/>
          <Route exact path = '/Home/:*' component = {Detail}/>
          <Route exact path = '*' component = {NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;