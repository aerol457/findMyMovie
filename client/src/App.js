import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout'
import asyncComponent from './components/utils/AsyncComponent/asyncComponent';

const asyncMainMovie = asyncComponent(() => import('./components/Pages/Body/MainMovie/MainMovie')); 
const asyncMyMovieList = asyncComponent(() => import('./components/Pages/Body/MyMovieList/MyMovieList')); 
const asyncTopPicks = asyncComponent(() => import('./components/Pages/Body/TopPicks/TopPicks')); 
const asyncRecentMovies = asyncComponent(() => import('./components/Pages/Body/RecentMovies/RecentMovies')); 
const asyncSignUp = asyncComponent(() => import('./components/Pages/Body/SignUp/SignUp')); 
const asyncLogin = asyncComponent(() => import('./components/Pages/Body/Login/Login')); 

class App extends Component {

  render(){
    return (
      <div>
        <Router>
            <Layout>
                <Switch>
                  <Route path='/login' component={asyncLogin}/>
                  <Route path='/sign-up' component={asyncSignUp}/>
                  <Route path='/recent' component={asyncRecentMovies}/>
                  <Route path='/top-picks' component={asyncTopPicks}/>
                  <Route path='/my-list' component={asyncMyMovieList}/>
                  <Route path='/' component={asyncMainMovie}/>
                  <Redirect to='/'/>
                </Switch>
              </Layout>
            </Router>
      </div>
      );
    }
  }
    
    export default App;
