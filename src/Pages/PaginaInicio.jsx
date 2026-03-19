import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DESTAQUE = {
  id: 1,
  titulo: "Além do Horizonte",
  descricao:
    "Em um futuro próximo, uma espiã renegada descobre que a maior ameaça à humanidade não vem de fora — vem de dentro da própria organização que jurou proteger o mundo.",
  categoria: "Ação • Ficção Científica",
  ano: 2024,
  avaliacao: "9.1",
  duracao: "2h 18min",
  capa: null,
};

const FILMES = [
  { id: 2,  titulo: "Ruínas do Amanhã",   genero: "Sci-Fi",    ano: 2024, avaliacao: "8.4", capa: null },
  { id: 3,  titulo: "A Última Fronteira", genero: "Aventura",  ano: 2023, avaliacao: "7.9", capa: null },
  { id: 4,  titulo: "Sombra Vermelha",    genero: "Thriller",  ano: 2024, avaliacao: "8.7", capa: null },
  { id: 5,  titulo: "Código Fantasma",    genero: "Ação",      ano: 2023, avaliacao: "7.5", capa: null },
  { id: 6,  titulo: "Mar de Cinzas",      genero: "Drama",     ano: 2024, avaliacao: "9.0", capa: null },
  { id: 7,  titulo: "Pulso",              genero: "Horror",    ano: 2023, avaliacao: "8.2", capa: null },
  { id: 8,  titulo: "Vento Norte",        genero: "Drama",     ano: 2022, avaliacao: "8.8", capa: null },
  { id: 9,  titulo: "Espelho Partido",    genero: "Suspense",  ano: 2024, avaliacao: "7.6", capa: null },
];

const SERIES = [
  { id: 13, titulo: "Convergência",      genero: "Drama",      ano: 2024, avaliacao: "9.2", temporadas: 2, capa: null },
  { id: 14, titulo: "Protocolo Zero",    genero: "Espionagem", ano: 2023, avaliacao: "8.6", temporadas: 3, capa: null },
  { id: 15, titulo: "Neon City",         genero: "Cyberpunk",  ano: 2024, avaliacao: "8.9", temporadas: 1, capa: null },
  { id: 16, titulo: "As Filhas do Mar",  genero: "Fantasia",   ano: 2023, avaliacao: "8.3", temporadas: 2, capa: null },
  { id: 17, titulo: "Verdade Fraturada", genero: "Thriller",   ano: 2022, avaliacao: "9.0", temporadas: 4, capa: null },
  { id: 18, titulo: "Círculo de Fogo",   genero: "Ação",       ano: 2024, avaliacao: "7.8", temporadas: 1, capa: null },
];

function Card({ item }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/detalhes/${item.id}`)}>
      <div className="card-poster">
        {item.capa
          ? <img src={item.capa} alt={item.titulo} />
          : <div className="card-poster-placeholder" />
        }
        <span className="card-avaliacao">★ {item.avaliacao}</span>
        <div className="card-hover-overlay">
          <button className="card-btn-assistir">▶ Assistir</button>
        </div>
      </div>
      <div className="card-info">
        <p className="card-titulo">{item.titulo}</p>
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

  useEffect(() => {
    const t = setTimeout(() => setCarregando(false), 600);
    return () => clearTimeout(t);
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
        <div className="banner-overlay" />
        <div className="banner-gradiente-inferior" />

        <div className="banner-conteudo">
          <span className="banner-tag">Em Destaque</span>
          <h1 className="banner-titulo">{DESTAQUE.titulo}</h1>

          <div className="banner-meta">
            <span className="banner-avaliacao">★ {DESTAQUE.avaliacao}</span>
            <span>{DESTAQUE.ano}</span>
            <span>{DESTAQUE.duracao}</span>
            <span>{DESTAQUE.categoria}</span>
          </div>

          <p className="banner-descricao">{DESTAQUE.descricao}</p>

          <div className="banner-acoes">
            <button
              className="btn-primario"
              onClick={() => navigate(`/detalhes/${DESTAQUE.id}`)}
            >
              ▶ Assistir agora
            </button>
            <button
              className="btn-secundario"
              onClick={() => navigate(`/detalhes/${DESTAQUE.id}`)}
            >
              ℹ Mais info
            </button>
          </div>
        </div>
      </div>

      <div className="conteudo">
        <Linha titulo="🔥 Em Alta"            itens={FILMES} />
        <Linha titulo="📺 Séries Populares"   itens={SERIES} />
        <Linha titulo="🎬 Filmes em Destaque" itens={FILMES.slice(3)} />
      </div>
    </div>
  );
}