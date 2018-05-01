import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import HeaderDOM from '../components/header_dom';
import MainDOM from '../components/main_dom';
import FooterDOM from '../components/footer_dom';


const App = () => (
  <div className="App">
    <HeaderDOM />
    <Route path="/" component={MainDOM} />
    <FooterDOM />
  </div>
);

export default App;
