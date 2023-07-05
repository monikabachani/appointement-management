import './App.css';
import AppointmentBookingPage from './components/AppointmentBookingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorAvailabilityForm from './components/DoctorAvailabilityForm';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Routes>
            <Route exact path="/create-appointment" element={<AppointmentBookingPage />} />
            <Route exact path="/" element={<DoctorAvailabilityForm />} />
          </Routes>
        </Container>
      </Router>
      </div>
  );  
}

export default App;
