// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes with element or component */}
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:name" element={<CountryDetail />} />
        
        {/* If you have a route that should render nothing, use null as the element */}
        <Route path="/empty" element={null} />
      </Routes>
    </Router>
  );
}

export default App;
