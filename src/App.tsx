import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Main from './pages/Main';
import Contact from './pages/Contact';
import ContactForm from './pages/ContactForm';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/homebrew" element={<div>Homebrew Page</div>} />
        <Route path="/contact/:type" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
