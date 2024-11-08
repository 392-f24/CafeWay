import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ReviewPostPage from "./pages/ReviewPostPage";
import ReviewsPage from "./pages/ReviewsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/post" element={ <ReviewPostPage/> }/>
        <Route path="/cafes" element={ <ReviewsPage/> }/>
      </Routes>
    </Router>
  )
}

export default App;
