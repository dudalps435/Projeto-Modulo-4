import { createContext, useState, useEffect } from "react";
import { CATALOGO_PADRAO } from "../constants/catalogo";

export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const salvo = localStorage.getItem("watchlist");
    return salvo ? JSON.parse(salvo) : CATALOGO_PADRAO;
  });
  const [filtros, setFiltros] = useState({
    genero: "",
    plataforma: "",
    status: "",
  });

  // Salvar no localStorage quando watchlist muda
  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  // Filtrar com .filter() encadeado por múltiplos critérios
  const watchlistFiltrada = watchlist.filter((item) => {
    const passaGenero = filtros.genero ? item.genero === filtros.genero : true;
    const passaPlataforma = filtros.plataforma ? item.plataforma === filtros.plataforma : true;
    const passaStatus = filtros.status ? item.status === filtros.status : true;
    
    return passaGenero && passaPlataforma && passaStatus;
  });

  function adicionarTitulo(titulo) {
    const novoId = Math.max(...watchlist.map(t => t.id), 0) + 1;
    const novoTitulo = {
      id: novoId,
      ...titulo,
      nota: 0,
    };
    setWatchlist([...watchlist, novoTitulo]);
  }

  function removerTitulo(id) {
    setWatchlist(watchlist.filter(t => t.id !== id));
  }

  function atualizarTitulo(id, atualizacoes) {
    setWatchlist(
      watchlist.map(t => t.id === id ? { ...t, ...atualizacoes } : t)
    );
  }

  function atualizarFiltros(novosFiltros) {
    setFiltros(novosFiltros);
  }

  function obterGeneros() {
    return [...new Set(watchlist.map(t => t.genero))].sort();
  }

  function obterPlataformas() {
    return [...new Set(watchlist.map(t => t.plataforma))].sort();
  }

  function obterStatus() {
    return ["quero assistir", "assistindo", "assistido"];
  }

  const value = {
    watchlist,
    watchlistFiltrada,
    filtros,
    adicionarTitulo,
    removerTitulo,
    atualizarTitulo,
    atualizarFiltros,
    obterGeneros,
    obterPlataformas,
    obterStatus,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}
