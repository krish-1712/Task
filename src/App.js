
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateLocation from './components/CreateLocation';
import EditLocation from './components/EditLocation';
import DeleteLocation from './components/DeleteLocation';
import Details from './components/Details';
import AppProvider from './Context/AppProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route>
          
         
          <Route path='/' element={<Login/>} />
          <Route path='/create' element={<CreateLocation/>} />
          <Route path='/edits/:id' element={<EditLocation/>} />
          <Route path='/delete' element={ <DeleteLocation/>} />
          <Route path='/details/:id' element={<Details/>} />
          <Route path='/app' element={<AppProvider/>} />
          
 


          
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
