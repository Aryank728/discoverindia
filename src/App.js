import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sample from './Pages/sample';
import SignupForm from './Pages/Signup';
import LoginForm from './Pages/Login';
import AdminForm from './Pages/AdminForm';
import Fetch from "./Context/fetch";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Sample />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/adminform" element={<AdminForm />} />
          <Route path="/fetch" element={<Fetch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;