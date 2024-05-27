import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sample from './Pages/sample';
import SignupForm from './Pages/Signup';
import LoginForm from './Pages/Login';
import AdminForm from './Pages/AdminForm';
import AndhraPradesh from './Pages/andhraPradesh';
import PalaceForm from './Pages/PalaceForm';
import Constitution from './Pages/Constitution';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Sample />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/stateform" element={<AdminForm />} />
          <Route path="/state/andhrapradesh" element={<AndhraPradesh />} />
          <Route path="/placeform" element={<PalaceForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;