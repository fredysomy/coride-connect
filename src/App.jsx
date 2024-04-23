
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Import your components
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfileCreatePage from './pages/ProfileCreate';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/profile/create">
          <ProfileCreatePage />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
