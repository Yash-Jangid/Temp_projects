import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventForm from './pages/EventForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/new" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
