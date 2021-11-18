import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './ProfilePlatformPages.css';
import './QuestPage.css';
import './QuizPages.css';
import './UpdatePage.css';
import './QuizCollectionPage.css';

import { AuthProvider } from './context/auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Platform from './pages/Platform';
import Quiz from './pages/Quiz';
import QuizEdit from './pages/QuizEdit';
import QuizCollection from './pages/QuizCollection';
import Update from './pages/Update';
import Quest from './pages/Quest';
import QuizStart from './pages/QuizStart';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <Route exact path='/' component={Home}/>
          <Route exact path="/search" render={() => (
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          )}/>
          <Route exact path="/profile/:profileId" component={Profile}/>
          <Route exact path="/platform/:platformId" component={Platform}/>
          <Route exact path="/quiz/:quizId" component={Quiz}/>
          <Route exact path="/quiz/edit/:quizId" component={QuizEdit}/>
          <Route exact path="/quizCollection/:quizCollectionId" component={QuizCollection}/>
          <Route exact path="/update" component={Update}/>
          <Route exact path="/quests" component={Quest}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;