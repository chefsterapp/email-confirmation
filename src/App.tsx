import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Confirmation from "./Confirmation";

function Home() {
  return <h1>Home</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/verify" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
