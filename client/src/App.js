import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Route exact path='/' component={Home}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
