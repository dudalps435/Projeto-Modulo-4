import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieCredits, getMovieTrailerUrl, searchMovieByTitle, getPosterUrl } from "../services/TMDBService";
import { CATALOGO_PADRAO } from "../constants/catalogo";
import { WatchlistContext } from "../contexts/WatchlistContext";

const CAPA_FALLBACK = "/capa-fallback.svg";

const SIMILARES_IDS = [2, 3, 4, 6, 7, 13];

function CardSimilar({ item }) {
  const navigate = useNavigate();

  return (
    <div className="card-similar" onClick={() => navigate(`/titulo/${item.id}`)}>
      <div className="card-similar-poster">
        {item.capa
          ? <img src={item.capa || CAPA_FALLBACK} alt={item.titulo} onError={(e) => { e.currentTarget.src = CAPA_FALLBACK; }} />
          : <div className="card-similar-placeholder" />
        }
        <span className="card-similar-avaliacao">★ {item.avaliacao}</span>
      </div>
      <div className="card-similar-info">
        <p className="card-similar-titulo">{item.titulo}</p>
        <p className="card-similar-sub">{item.genero} • {item.ano}</p>
      </div>
    </div>
  );
}

export default function PaginaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Integração real com WatchlistContext
  const { watchlist, adicionarTitulo, removerTitulo } = useContext(WatchlistContext);

  const [toastVisivel, setToastVisivel] = useState(false);
  const [toastMensagem, setToastMensagem] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [elencoTMDB, setElencoTMDB] = useState([]);
  const [posterTMDB, setPosterTMDB] = useState("");

  // Busca o título no catálogo central
  const item = CATALOGO_PADRAO.find((c) => c.id === Number(id));

  // Verifica se já está na watchlist (estado real, não local)
  const naWatchlist = watchlist.some((t) => t.id === Number(id));

  const similares = item
    ? CATALOGO_PADRAO.filter((c) => SIMILARES_IDS.includes(c.id) && c.id !== item.id).slice(0, 6)
    : [];

  useEffect(() => {
    let ativo = true;

    if (!item) {
      navigate("/404");
      return () => { ativo = false; };
    }

    async function carregarDadosTMDB() {
      try {
        const filmeTMDB = await searchMovieByTitle(item.titulo);
        if (!filmeTMDB || !ativo) return;

        const [urlTrailer, creditos] = await Promise.all([
          getMovieTrailerUrl(filmeTMDB.id),
          getMovieCredits(filmeTMDB.id),
        ]);

        if (!ativo) return;

        setTrailerUrl(urlTrailer);
        setElencoTMDB((creditos.cast || []).slice(0, 8).map((ator) => ator.name));
        setPosterTMDB(getPosterUrl(filmeTMDB.poster_path));
      } catch (erro) {
        console.error("Erro ao carregar dados do TMDB:", erro.message);
      }
    }

    carregarDadosTMDB();

    return () => { ativo = false; };
  }, [item, navigate]);

  if (!item) {
    return null;
  }

  function toggleWatchlist() {
    if (naWatchlist) {
      removerTitulo(item.id);
      setToastMensagem("Removido da Watchlist");
    } else {
      adicionarTitulo({ ...item });
      setToastMensagem("✓ Adicionado à Watchlist!");
    }
    setToastVisivel(true);
    setTimeout(() => setToastVisivel(false), 2500);
  }

  return (
    <div className="pagina-detalhes">

      <div className="detalhes-hero">
        <div className="detalhes-hero-bg">
          {(posterTMDB || item.capa) && (
            <img
              src={posterTMDB || item.capa || CAPA_FALLBACK}
              alt={item.titulo}
              onError={(e) => { e.currentTarget.src = CAPA_FALLBACK; }}
            />
          )}
        </div>
        <div className="detalhes-hero-overlay" />
        <div className="detalhes-hero-gradiente" />

        <button className="btn-voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="detalhes-hero-conteudo">
          <div className="detalhes-badges">
            <span className="badge-tipo">{item.tipo === "serie" ? "Série" : "Filme"}</span>
            <span className="badge-categoria">{item.categoria}</span>
          </div>

          <h1 className="detalhes-titulo">{item.titulo}</h1>

          <div className="detalhes-meta">
            <span className="detalhes-avaliacao">★ {item.avaliacao}</span>
            <span>{item.ano}</span>
            {item.duracao && <span>{item.duracao}</span>}
            {item.temporadas && (
              <span>
                {item.temporadas} temporada{item.temporadas > 1 ? "s" : ""} • {item.episodios} episódios
              </span>
            )}
          </div>

          <p className="detalhes-descricao">{item.descricao}</p>

          <div className="detalhes-acoes">
            {trailerUrl ? (
              <a
                className="btn-primario"
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ Ver trailer
              </a>
            ) : (
              <button className="btn-primario">▶ Assistir</button>
            )}
            <button
              className={`btn-watchlist ${naWatchlist ? "ativo" : ""}`}
              onClick={toggleWatchlist}
            >
              {naWatchlist ? "✓ Na Watchlist" : "+ Watchlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="detalhes-info">
        <div className="detalhes-creditos">
          <div>
            <p className="credito-label">Direção</p>
            <p className="credito-valor">{item.diretor}</p>
          </div>
          <div>
            <p className="credito-label">Elenco Principal</p>
            <div className="elenco-lista">
              {(elencoTMDB.length > 0 ? elencoTMDB : item.elenco).map((ator) => (
                <span key={ator} className="elenco-chip">{ator}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="detalhes-divisor" />

        <section className="similares">
          <h2 className="similares-titulo">Títulos Relacionados</h2>
          <div className="similares-lista">
            {similares.map((s) => (
              <CardSimilar key={s.id} item={s} />
            ))}
          </div>
        </section>
      </div>

      {toastVisivel && (
        <div className={`toast ${naWatchlist ? "toast-ativo" : ""}`}>
          {toastMensagem}
        </div>
      )}
    </div>
  );
}
