import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Vacancies from "./pages/Vacancies";
import { AboutMe } from "./pages/About";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Vacancies />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </>
  );
};
export default App;
