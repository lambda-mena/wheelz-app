import {BrowserRouter , Routes , Route} from 'react-router-dom';
import {Home} from './pages/Home';
import { Error404 } from './pages/Error404';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='*' Component={Error404} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
