import Leaderboard from './components/Leaderboard.jsx';
import Home from './components/home.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App(){

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;