import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WATCHLIST_INICIAL = [
  { id: 6,  titulo: "Mar de Cinzas",    genero: "Drama",      ano: 2024, avaliacao: "9.0", duracao: "2h 22min", tipo: "filme", assistido: false, capa: null },
  { id: 13, titulo: "Convergência",     genero: "Drama",      ano: 2024, avaliacao: "9.2", temporadas: 2,       tipo: "serie", assistido: true,  capa: null },
  { id: 4,  titulo: "Sombra Vermelha",  genero: "Thriller",   ano: 2024, avaliacao: "8.7", duracao: "1h 48min", tipo: "filme", assistido: false, capa: null },
  { id: 15, titulo: "Neon City",        genero: "Cyberpunk",  ano: 2024, avaliacao: "8.9", temporadas: 1,       tipo: "serie", assistido: false, capa: null },
  { id: 8,  titulo: "Vento Norte",      genero: "Drama",      ano: 2022, avaliacao: "8.8", duracao: "2h 14min", tipo: "filme", assistido: true,  capa: null },
  { id: 14, titulo: "Protocolo Zero",   genero: "Espionagem", ano: 2023, avaliacao: "8.6", temporadas: 3,       tipo: "serie", assistido: false, capa: null },
];

function CardWatchlist({ item, onRemover, onToggleAssistido }) {
  const navigate = useNavigate();
  const [confirmando, setConfirmando] = useState(false);

  function handleRemover(e) {
    e.stopPropagation();
    if (confirmando) {
      onRemover(item.id);
    } else {
      setConfirmando(true);
      setTimeout(() => setConfirmando(false), 2500);
    }
  }

  function handleAssistido(e) {
    e.stopPropagation();
    onToggleAssistido(item.id);
  }

  return (
    <div className={`card-watchlist ${item.assistido ? "card-watchlist-visto" : ""}`}>

      <div className="watchlist-poster" onClick={() => navigate(`/detalhes/${item.id}`)}>
        {item.capa
          ? <img src={item.capa} alt={item.titulo} />
          : <div className="watchlist-poster-placeholder" />
        }
        {item.assistido && <span className="watchlist-badge-visto">✓ Visto</span>}
        <span className="watchlist-badge-tipo">
          {item.tipo === "serie" ? "Série" : "Filme"}
        </span>
      </div>

      <div className="watchlist-info">
        <div>
          <h3
            className="watchlist-titulo"
            onClick={() => navigate(`/detalhes/${item.id}`)}
          >
            {item.titulo}
          </h3>
          <div className="watchlist-meta">
            <span className="watchlist-avaliacao">★ {item.avaliacao}</span>
            <span>{item.genero}</span>
            <span>{item.ano}</span>
            {item.duracao && <span>{item.duracao}</span>}
            {item.temporadas && (
              <span>{item.temporadas} temporada{item.temporadas > 1 ? "s" : ""}</span>
            )}
          </div>
        </div>

        <div className="watchlist-acoes">
          <button
            className="btn-primario btn-sm"
            onClick={() => navigate(`/detalhes/${item.id}`)}
          >
            ▶ Assistir
          </button>

          <button
            className={`btn-visto btn-sm ${item.assistido ? "btn-visto-ativo" : ""}`}
            onClick={handleAssistido}
          >
            {item.assistido ? "✓ Visto" : "Marcar como visto"}
          </button>

          <button
            className={`btn-remover btn-sm ${confirmando ? "btn-remover-confirmando" : ""}`}
            onClick={handleRemover}
          >
            {confirmando ? "Confirmar remoção?" : "✕ Remover"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaginaWatchlist() {
  const navigate = useNavigate();
  const [lista, setLista] = useState(WATCHLIST_INICIAL);
  const [filtro, setFiltro] = useState("todos");
  const [toast, setToast] = useState(null);

  function mostrarToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function remover(id) {
    setLista((l) => l.filter((i) => i.id !== id));
    mostrarToast("Título removido da Watchlist");
  }

  function toggleAssistido(id) {
    const item = lista.find((i) => i.id === id);
    setLista((l) =>
      l.map((i) => (i.id === id ? { ...i, assistido: !i.assistido } : i))
    );
    mostrarToast(item.assistido ? "Marcado como não visto" : "Marcado como visto ✓");
  }

  const listaFiltrada =
    filtro === "pendentes" ? lista.filter((i) => !i.assistido) :
    filtro === "vistos"    ? lista.filter((i) =>  i.assistido) :
    lista;

  const totalVistos    = lista.filter((i) =>  i.assistido).length;
  const totalPendentes = lista.filter((i) => !i.assistido).length;

  return (
    <div className="pagina-watchlist">

      <div className="watchlist-header">
        <button className="btn-voltar-texto" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="watchlist-header-conteudo">
          <div>
            <h1 className="watchlist-titulo-pagina">Minha Watchlist</h1>
            <div className="watchlist-stats">
              <span><strong>{lista.length}</strong> títulos</span>
              <span><strong className="stat-verde">{totalVistos}</strong> vistos</span>
              <span><strong className="stat-vermelho">{totalPendentes}</strong> pendentes</span>
            </div>
          </div>

          <div className="watchlist-filtros">
            {[
              { valor: "todos",     label: "Todos" },
              { valor: "pendentes", label: "Pendentes" },
              { valor: "vistos",    label: "Vistos" },
            ].map((f) => (
              <button
                key={f.valor}
                className={`btn-filtro ${filtro === f.valor ? "btn-filtro-ativo" : ""}`}
                onClick={() => setFiltro(f.valor)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="watchlist-lista">
        {listaFiltrada.length === 0 ? (
          <div className="watchlist-vazia">
            <span className="watchlist-vazia-icone">🎬</span>
            <h2 className="watchlist-vazia-titulo">
              {filtro === "vistos"    ? "Nenhum título visto ainda" :
               filtro === "pendentes" ? "Nenhum título pendente"    :
               "Sua Watchlist está vazia"}
            </h2>
            <p className="watchlist-vazia-texto">
              {filtro === "todos"
                ? "Adicione filmes e séries para assistir mais tarde."
                : "Mude o filtro para ver outros títulos."}
            </p>
            <button className="btn-primario" onClick={() => navigate("/")}>
              Explorar catálogo
            </button>
          </div>
        ) : (
          <div className="watchlist-grid">
            {listaFiltrada.map((item) => (
              <CardWatchlist
                key={item.id}
                item={item}
                onRemover={remover}
                onToggleAssistido={toggleAssistido}
              />
            ))}
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}