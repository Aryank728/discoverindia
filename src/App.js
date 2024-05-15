import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';// Ensure this matches the filename
import Sample from './Pages/sample'; // Ensure this matches the filename
import SignupForm from './Pages/Signup';
import LoginForm from './Pages/Login';
import AdminForm from './Pages/AdminForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/hi" element={<Sample />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<AdminForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;