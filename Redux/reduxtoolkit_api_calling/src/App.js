//CRUD APPLICATION

import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Create></Create>} />
      <Route exact path="/read" element={<Read></Read>} />
      <Route exact path="/createPost" element={<Create></Create>} />
      <Route exact path="/edit/:id" element={<Update></Update>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
