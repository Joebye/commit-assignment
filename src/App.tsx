import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator, { RouteType } from './components/navigators/Navigator';
import Form from './components/pages/Form';
import User from './components/pages/ListUsers';
import routesConfig from './config/routes-config.json'
import ListUsers from './components/pages/ListUsers';
import { Provider } from 'react-redux';
import {store} from '../src/redux/store';

const {always} = routesConfig;

function getRoutes(): RouteType[] {
  const res: RouteType[] = [];
  res.push(...always);
  return res;
}

const App: React.FC = () => {

  const routes = getRoutes();


  return <Provider store={store}>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Navigator routes={routes}/>}>
          <Route path='form' element={<Form/>}/>
          <Route path='user' element={<ListUsers/>}/>

        </Route>
  

    </Routes>
  
  </BrowserRouter>
  </Provider>
}

export default App;
