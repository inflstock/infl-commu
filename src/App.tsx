import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppFooter, AppHeader } from './components';
import { MainPage } from './pages';
import { AnalisisPage } from './pages';
import './palettes.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/analisis/:name/:rank" element={<AnalisisPage />} />
        </Routes>
      </BrowserRouter>
      <AppFooter />
    </>
  );
}

export default App;
