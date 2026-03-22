import './App.css';
import Home from './screens/Home';
import Reports from './screens/Reports';
import About from './screens/About';
import Login from './screens/Login';
import Live from './screens/Live';
import Signup from './screens/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route redirects to Signup */}
           <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
         

          {/* Protected Routes */}
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/live" element={
            <ProtectedRoute>
              <Live />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
