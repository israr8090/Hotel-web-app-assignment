import { BrowserRouter, Routes, Route } from 'react-router-dom'
//-import Navbar component from components folder
import Navbar from './components/Navbar';
//-import pages from screen folder
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
function App() {
  return (
    <div className="App">
      <Navbar />   
      <BrowserRouter> 
        <Routes>
          <Route path="/" element= {<Landingscreen/>} />
          <Route path="/home" element= {<Homescreen/>} />
          <Route path="/register" element= {<Registerscreen/>} />
          <Route path="/login" element= {<Loginscreen/>} />
          <Route path="/profile" element= {<Profilescreen/>} />
          <Route path="/book/:roomid/:fromdate/:todate" element= {<Bookingscreen/>} />
          <Route path="/admin" element= {<Adminscreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
