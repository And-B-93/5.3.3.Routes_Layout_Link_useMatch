import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Vacancies from "./pages/Vacancies";
import { AboutMe } from "./pages/About";
import { ErrorPage } from "./pages/ErrorPage";
import { DescriptionVacancy } from "./pages/DescriptionVacanc";
import { Lyaout } from "./pages/Layout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Lyaout />}>
        <Route path="/" element={<Vacancies />} />
        <Route path="/vacancies/:id" element={<DescriptionVacancy />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>,
    ),
    {
      basename: "/5.3.3.Routes_Layout_Link_useMatch",
    },
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
