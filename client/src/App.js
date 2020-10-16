import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout'
import asyncComponent from './components/utils/AsyncComponent/asyncComponent';

const asyncMainMovie = asyncComponent(() => import('./components/Pages/Body/MainMovie/MainMovie')); 
const asyncMyMovieList = asyncComponent(() => import('./components/Pages/Body/MyMovieList/MyMovieList')); 
const asyncTopPicks = asyncComponent(() => import('./components/Pages/Body/TopPicks/TopPicks')); 
const asyncRecentMovies = asyncComponent(() => import('./components/Pages/Body/RecentMovies/RecentMovies')); 
const asyncSignUp = asyncComponent(() => import('./components/Pages/Body/SignUp/SignUp')); 
const AsyncLogin = asyncComponent(() => import('./components/Pages/Body/Login/Login')); 

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
      isAuth: true,
    });
    this.setTimeLogout(remainingMilliseconds);
  }

  setTimeLogout = (milliseconds) => {
    setTimeout(() => {
      this.authLogoutHandler();
    },milliseconds)
  }
  
  authLogoutHandler = () => {
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
     <div>
     <Route path='/login' render={(props) => (
       <AsyncLogin {...props} onLogin= {(milliseconds) => this.setTimeLogout(milliseconds)} />
       )}/>
       <Route path='/sign-up' component={asyncSignUp}/>
       <Route path='/top-picks' component={asyncTopPicks}/>
       <Route path='/' component={asyncMainMovie}/>
        <Redirect to='/'/>
     </div>
    );
      //Change the navidatiopn items components 
    if(this.state.isAuth){
      navigationItems = (
        <div>
          <Route path='/top-picks' component={asyncTopPicks}/>
          <Route path='/recent' component={asyncRecentMovies}/>
          <Route path='/my-list' component={asyncMyMovieList}/>
          <Route path='/' component={asyncMainMovie}/>
          <Redirect to='/'/>
        </div>
      );
    }

    return (
      <div>
        <Router>
            <Layout isAuth={this.state.isAuth}>
                <Switch>
                {navigationItems}
                </Switch>
              </Layout>
            </Router>
      </div>
      );
    }
  }
    
    export default App;
