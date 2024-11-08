import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ReviewPostPage from "./pages/ReviewPostPage";
import ReviewsPage from "./pages/ReviewsPage";
import CafePage from "./pages/CafePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/post" element={ <ReviewPostPage/> }/>
        <Route path="/cafes" element={ <ReviewsPage/> }/>
        <Route path="/cafe/:place_id" element={<CafePage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
