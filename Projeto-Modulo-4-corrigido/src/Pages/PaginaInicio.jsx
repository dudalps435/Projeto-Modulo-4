import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SugestaoSemanal } from "../components/SugestaoSemanal";
import { getPopularMovies, getTopRatedMovies, getPopularSeries, getMovieTrailerUrl } from "../services/TMDBService";
import { CATALOGO_FILMES, CATALOGO_SERIES, DESTAQUE_PADRAO } from "../constants/catalogo";

const CAPA_FALLBACK = "/capa-fallback.svg";

const FILMES = CATALOGO_FILMES;
const SERIES = CATALOGO_SERIES;
const DESTAQUE = DESTAQUE_PADRAO;

function Card({ item }) {
  const navigate = useNavigate();

  function abrirTrailer(e) {
    e.stopPropagation();
    if (item.trailerUrl) {
      window.open(item.trailerUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="card" onClick={() => navigate(`/titulo/${item.id}`)}>
      <div className="card-poster">
        {item.capa
          ? <img src={item.capa || CAPA_FALLBACK} alt={item.titulo} onError={(e) => { e.currentTarget.src = CAPA_FALLBACK; }} />
          : <div className="card-poster-placeholder" />
        }
        <span className="card-avaliacao">★ {item.avaliacao}</span>
        <div className="card-hover-overlay">
          {item.trailerUrl ? (
            <button className="card-btn-trailer" onClick={abrirTrailer}>▶ Trailer</button>
          ) : (
            <button className="card-btn-assistir">▶ Assistir</button>
          )}
        </div>
      </div>
      <div className="card-info">
        <p className="card-titulo">{item.titulo}</p>
        <p className="card-nota-destaque">Nota: {item.avaliacao} / 10</p>
        <p className="card-sub">
          {item.genero} • {item.ano}
          {item.temporadas ? ` • ${item.temporadas}T` : ""}
        </p>
      </div>
    </div>
  );
}

function Linha({ titulo, itens }) {
  return (
    <section className="linha">
      <h2 className="linha-titulo">{titulo}</h2>
      <div className="linha-cards">
        {itens.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function PaginaInicio() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [filmesPopulares, setFilmesPopulares] = useState(FILMES);
  const [filmesAtuais, setFilmesAtuais] = useState(FILMES);
  const [filmesAntigos, setFilmesAntigos] = useState(FILMES);
  const [filmesMelhores, setFilmesMelhores] = useState(FILMES);
  const [seriesPopulares, setSeriesPopulares] = useState(SERIES);
  const [destaque, setDestaque] = useState(DESTAQUE);

  useEffect(() => {
    const t = setTimeout(() => setCarregando(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregarPopulares() {
      try {
        const [populares, melhoresNotas, seriesRecentes] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularSeries(),
        ]);

        const combinados = [...populares, ...melhoresNotas]
          .filter((item, idx, arr) => idx === arr.findIndex((x) => x.titulo === item.titulo));

        if (ativo && combinados.length > 0) {
          const popularesComTrailer = await Promise.all(
            combinados.slice(0, 30).map(async (filme) => {
              if (filme.trailerUrl) return filme;
              try {
                const trailerUrl = await getMovieTrailerUrl(filme.id);
                return { ...filme, trailerUrl };
              } catch {
                return { ...filme, trailerUrl: "" };
              }
            })
          );

          const atuaisApi = popularesComTrailer
            .filter((f) => Number(f.ano) >= 2018)
            .sort((a, b) => Number(b.avaliacao) - Number(a.avaliacao))
            .slice(0, FILMES.length);

          const antigosApi = popularesComTrailer
            .filter((f) => Number(f.ano) > 0 && Number(f.ano) <= 2005)
            .sort((a, b) => Number(b.avaliacao) - Number(a.avaliacao))
            .slice(0, FILMES.length);

          const melhoresApi = popularesComTrailer
            .filter((f) => Number(f.avaliacao) >= 8.0)
            .sort((a, b) => Number(b.avaliacao) - Number(a.avaliacao))
            .slice(0, FILMES.length);

          const mapearComIdsLocais = (listaApi) =>
            FILMES.map((local, idx) => {
              const api = listaApi[idx];
              if (!api) return local;
              return {
                ...local,
                titulo: api.titulo || local.titulo,
                genero: api.genero || local.genero,
                ano: api.ano || local.ano,
                avaliacao: api.avaliacao || local.avaliacao,
                capa: api.capa || local.capa,
                trailerUrl: api.trailerUrl || "",
                descricao: api.descricao || "",
                categoria: api.categoria || local.genero,
                backdrop: api.backdrop || api.capa || local.capa,
              };
            });

          const filmesMesclados = mapearComIdsLocais(popularesComTrailer.slice(0, FILMES.length));
          const filmesAtuaisMesclados = mapearComIdsLocais(atuaisApi);
          const filmesAntigosMesclados = mapearComIdsLocais(antigosApi);
          const filmesMelhoresMesclados = mapearComIdsLocais(melhoresApi);

          setFilmesPopulares(filmesMesclados);
          setFilmesAtuais(filmesAtuaisMesclados);
          setFilmesAntigos(filmesAntigosMesclados);
          setFilmesMelhores(filmesMelhoresMesclados);

          const seriesMescladas = SERIES.map((local, idx) => {
            const api = (seriesRecentes || [])[idx];
            if (!api) return local;
            return {
              ...local,
              titulo: api.titulo || local.titulo,
              genero: api.genero || local.genero,
              ano: api.ano || local.ano,
              avaliacao: api.avaliacao || local.avaliacao,
              capa: api.capa || local.capa,
              trailerUrl: api.trailerUrl || "",
              categoria: api.categoria || local.genero,
              tipo: 'serie',
            };
          });

          setSeriesPopulares(seriesMescladas);

          const destaqueTMDB = filmesMelhoresMesclados[0] || filmesMesclados[0];
          setDestaque({
            id: destaqueTMDB.id,
            titulo: destaqueTMDB.titulo,
            descricao: destaqueTMDB.descricao || DESTAQUE.descricao,
            categoria: destaqueTMDB.categoria || DESTAQUE.categoria,
            ano: destaqueTMDB.ano || DESTAQUE.ano,
            avaliacao: destaqueTMDB.avaliacao || DESTAQUE.avaliacao,
            duracao: DESTAQUE.duracao,
            capa: destaqueTMDB.backdrop || DESTAQUE.capa,
            trailerUrl: destaqueTMDB.trailerUrl || "",
          });
        }
      } catch (erro) {
        console.error("Erro ao buscar filmes da API publica:", erro.message);
      }
    }

    carregarPopulares();

    const intervalo = setInterval(carregarPopulares, 1000 * 60 * 60 * 6);

    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, []);

  if (carregando) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="pagina-inicio">

      <div className="banner">
        <img
          className="banner-bg-img"
          src={destaque.capa || CAPA_FALLBACK}
          alt={destaque.titulo}
          onError={(e) => { e.currentTarget.src = CAPA_FALLBACK; }}
        />
        <div className="banner-overlay" />
        <div className="banner-gradiente-inferior" />
        
        <button
          className="btn-watchlist-flutuante"
          onClick={() => navigate("/watchlist")}
          title="Ir para Watchlist"
        >
          📋 Minha Watchlist
        </button>

        <button
          className="btn-notificacoes-flutuante"
          onClick={() => navigate("/notificacoes")}
          title="Configurar Notificações"
        >
          🔔
        </button>

        <button
          className="btn-semana-flutuante"
          onClick={() => navigate('/mais-assistidos')}
          title="Mais assistidos da semana"
        >
          📈 Semana
        </button>

        <div className="banner-conteudo">
          <span className="banner-tag">Em Destaque</span>
          <h1 className="banner-titulo">{destaque.titulo}</h1>

          <div className="banner-meta">
            <span className="banner-avaliacao">★ {destaque.avaliacao}</span>
            <span>{destaque.ano}</span>
            <span>{destaque.duracao}</span>
            <span>{destaque.categoria}</span>
          </div>

          <p className="banner-descricao">{destaque.descricao}</p>

          <div className="banner-acoes">
            {destaque.trailerUrl ? (
              <a
                className="btn-primario"
                href={destaque.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ Ver trailer
              </a>
            ) : (
              <button
                className="btn-primario"
                onClick={() => navigate(`/titulo/${destaque.id}`)}
              >
                ▶ Assistir agora
              </button>
            )}
            <button
              className="btn-secundario"
              onClick={() => navigate(`/titulo/${destaque.id}`)}
            >
              ℹ Mais info
            </button>
          </div>
        </div>
      </div>

      <div className="conteudo">
        <Linha titulo="🔥 Em Alta"            itens={filmesPopulares} />
        <Linha titulo="🆕 Filmes Atuais"      itens={filmesAtuais} />
        <Linha titulo="🎞️ Clássicos e Antigos" itens={filmesAntigos} />
        <Linha titulo="🏆 Notas Altas"         itens={filmesMelhores} />
        <Linha titulo="📺 Séries Populares (Mais Recentes)" itens={seriesPopulares} />
        <Linha titulo="🎬 Filmes em Destaque" itens={filmesMelhores.slice(2)} />

        <SugestaoSemanal />
      </div>
    </div>
  );
}