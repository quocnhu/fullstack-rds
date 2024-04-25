import Nav from './components/Navigation/Nav'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login' 
const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Routes>
        {/* exact to fix */}
          <Route path="/" exact element={<div>Home = Hello world</div>} /> 
          <Route path="/news" element={<div> Hell ya</div>} />
          <Route path="/contact" element={<div>Ya Hell</div>} />
          <Route path="/about" element={<div>Ya Hell</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 not found</div>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
