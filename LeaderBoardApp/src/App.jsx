import Leaderboard from './components/Leaderboard.jsx';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App(){

  return (
    <Router>
      <div>
        <Routes>
          
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;