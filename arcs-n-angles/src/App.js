import { Route, Routes } from "react-router-dom";
import Guest from './Guest/App'
import Admin from './Admin/App'
import User from './User/index'
import Architect from './Architect/App'
import Builder from './Builder/App'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Guest />} />
      <Route path="/Admin/*" element={<Admin />} />
      <Route path="/User/*" element={<User />} />
      <Route path="/Architect/*" element={<Architect />} />
      <Route path="/Builder/*" element={<Builder />} />
    </Routes>
  );
}

export default App;
