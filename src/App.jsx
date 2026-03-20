// Importamos os componentes essenciais do React Router DOM para gerenciar as rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importando nossos componentes e páginas
import Header from "./components/Header";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

function App() {
  return (
    // BrowserRouter engloba toda a aplicação para habilitar o roteamento
    <BrowserRouter>
      {/* O Header fica fora das rotas para aparecer em todas as páginas */}
      <Header />
      <Routes>
        {/* Definição das 4 rotas obrigatórias */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
