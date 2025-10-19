import './App.css';
import Header from './Components/Layout/Header';
import Main from './Components/Layout/Main';
import Footer from './Components/Layout/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Header/>
       <Main />
       <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
