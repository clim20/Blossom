import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './ProfilePlatformPages.css';
import './QuestPage.css';
import './QuizPages.css';
import './UpdatePage.css';

import { AuthProvider } from './context/auth';

import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Platform from './pages/Platform';
import Quiz from './pages/Quiz';
import QuizEdit from './pages/QuizEdit';
import Collection from './pages/Collection';
import Update from './pages/Update';
import Quest from './pages/Quest';
import QuizStart from './pages/QuizStart';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Route exact path='/' component={Home}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/profile/:profileId" component={Profile}/>
          <Route exact path="/platform/:platformId" component={Platform}/>
          <Route exact path="/quiz/:quizId" component={Quiz}/>
          <Route exact path="/quiz/edit/:quizId" component={QuizEdit}/>
          <Route exact path="/collection/:collectionId" component={Collection}/>
          <Route exact path="/update" component={Update}/>
          <Route exact path="/quests" component={Quest}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
