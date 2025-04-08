import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import LayoutComponent from './Layout/Layout';
import Task from './components/Task/Task';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/dashboard" element={<LayoutComponent />}>
          <Route path="task" element={<Task />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
