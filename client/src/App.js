import React, {Component} from 'react';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout'
import asyncComponent from './components/utils/AsyncComponent/asyncComponent';

const asyncMainMovie = asyncComponent(() => import('./components/Pages/Body/MainMovie/MainMovie')); 
const asyncMyMovieList = asyncComponent(() => import('./components/Pages/Body/MyMovieList/MyMovieList')); 
const asyncTopPicks = asyncComponent(() => import('./components/Pages/Body/TopPicks/TopPicks')); 
const asyncRecentMovies = asyncComponent(() => import('./components/Pages/Body/RecentMovies/RecentMovies')); 
const asyncSignUp = asyncComponent(() => import('./components/Pages/Body/SignUp/SignUp')); 
const AsyncLogin = asyncComponent(() => import('./components/Pages/Body/Login/Login')); 
let timer;
class App extends Component {
  state = {
    token: null,
    idUser: null,
    isAuth: false,
    error: null
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if(!token || !expiryDate){
      return;
    }

    if(new Date(expiryDate) <= new Date()){
      this.authLogoutHandler();
      return;
    }
    const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();
    const idUser = localStorage.getItem('idUser');
    this.setState({
      token: token,
      idUser: idUser,
      isAuth: true});

    this.setTimeLogout(remainingMilliseconds);
  }

  setTimeLogout = (milliseconds) => {
    timer = setTimeout(() => {
      this.authLogoutHandler();
    },milliseconds)
  }
  
  authLogoutHandler = () => {
    clearTimeout(timer);
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
    localStorage.removeItem('expiryDate');
    this.setState({
      token: null,
      idUser: null,
      isAuth: false
    })
  }

  render(){
    let navigationItems =  (
      <Switch>
        <Route path='/login' render={(props) => {
          return <AsyncLogin {...props} onLogin={(milliseconds) => this.setTimeLogout(milliseconds)} />
        }}/>
        <Route path='/sign-up' component={asyncSignUp}/>
        <Route path='/top-picks' component={asyncTopPicks}/>
        <Route path='/' component={asyncMainMovie}/>
        <Redirect to='/'/>
      </Switch>
      );

      if(this.state.isAuth){
        navigationItems = (
          <Switch>
            <Route path='/top-picks' component={asyncTopPicks}/>
            <Route path='/recent' component={asyncRecentMovies}/>
            <Route path='/my-list' component={asyncMyMovieList}/>
            <Route path='/' component={asyncMainMovie}/>
            <Redirect to='/'/>
        </Switch>
      );
    }
    return (
      <div>
        <BrowserRouter>
            <Layout isAuth={this.state.isAuth} onLogout={this.authLogoutHandler}>
                {navigationItems}
              </Layout>
        </BrowserRouter>
      </div>
      );
    }
  }
    
    export default App;
