import './App.css';
import {FloatingNavbar} from './Components/FloatingNavbar.js';
import Home from './Pages/Home';
import {useDispatch, useSelector} from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const page = useSelector(state => state.page);
  return (
    <div id="start-screen">
      <FloatingNavbar/>
      {page}
    </div>
  );
}

export default App;
