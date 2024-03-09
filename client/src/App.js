import MainPage from "./pages/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage/CreatePage";
import EditPage from "./pages/EditPage/EditPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
