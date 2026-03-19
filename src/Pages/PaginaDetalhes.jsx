import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CATALOGO = [
  { id: 1,  titulo: "Além do Horizonte",  descricao: "Em um futuro próximo, uma espiã renegada descobre que a maior ameaça à humanidade não vem de fora — vem de dentro da própria organização que jurou proteger o mundo.", categoria: "Ação • Ficção Científica", genero: "Ação",      ano: 2024, avaliacao: "9.1", duracao: "2h 18min", diretor: "Marina Alves",   elenco: ["Sofia Drumond", "Rafael Mendes", "Isabela Neves"],    tipo: "filme", capa: null },
  { id: 2,  titulo: "Ruínas do Amanhã",   descricao: "Uma civilização às margens do colapso tenta reconstruir o que resta da humanidade após um evento catastrófico.", categoria: "Ficção Científica",     genero: "Sci-Fi",    ano: 2024, avaliacao: "8.4", duracao: "1h 54min", diretor: "Pedro Costa",    elenco: ["Ana Lima", "Bruno Reis", "Camila Torres"],            tipo: "filme", capa: null },
  { id: 3,  titulo: "A Última Fronteira", descricao: "Exploradores adentram uma região inexplorada da Amazônia e encontram segredos que nunca deveriam ter sido descobertos.", categoria: "Aventura • Drama",  genero: "Aventura",  ano: 2023, avaliacao: "7.9", duracao: "2h 05min", diretor: "Lucas Ferreira", elenco: ["Mariana Silva", "João Pedro", "Fernanda Luz"],        tipo: "filme", capa: null },
  { id: 4,  titulo: "Sombra Vermelha",    descricao: "Um detetive obcecado persegue um assassino em série que deixa mensagens codificadas apenas para ele.", categoria: "Thriller • Crime",          genero: "Thriller",  ano: 2024, avaliacao: "8.7", duracao: "1h 48min", diretor: "Clara Moura",    elenco: ["Rodrigo Bastos", "Nina Carvalho", "Thiago Monte"],    tipo: "filme", capa: null },
  { id: 6,  titulo: "Mar de Cinzas",      descricao: "Após uma tragédia familiar, uma mulher precisa reaprender a existir em um mundo que segue em frente sem ela.", categoria: "Drama • Premiado",       genero: "Drama",     ano: 2024, avaliacao: "9.0", duracao: "2h 22min", diretor: "Beatriz Cunha",  elenco: ["Helena Faria", "Ricardo Souza", "Tatiana Cruz"],      tipo: "filme", capa: null },
  { id: 7,  titulo: "Pulso",              descricao: "Um hospital psiquiátrico começa a registrar eventos inexplicáveis após a chegada de uma nova paciente.", categoria: "Horror • Suspense",          genero: "Horror",    ano: 2023, avaliacao: "8.2", duracao: "1h 42min", diretor: "Fábio Nunes",    elenco: ["Cristina Vieira", "Marcos Teles", "Amanda Rocha"],    tipo: "filme", capa: null },
  { id: 13, titulo: "Convergência",       descricao: "Cinco estranhos com passados interligados descobrem que suas vidas convergem para um único momento decisivo.", categoria: "Drama • Mistério",        genero: "Drama",     ano: 2024, avaliacao: "9.2", temporadas: 2, episodios: 16, diretor: "Renata Borges",  elenco: ["Daniel Fonseca", "Aline Costa", "Victor Hugo"],       tipo: "serie", capa: null },
  { id: 14, titulo: "Protocolo Zero",     descricao: "Uma agente de inteligência descobre que sua própria agência está comprometida e precisa operar completamente sozinha.", categoria: "Espionagem • Ação", genero: "Espionagem",ano: 2023, avaliacao: "8.6", temporadas: 3, episodios: 24, diretor: "Marcos Vidal",   elenco: ["Juliana Prado", "Eduardo Neto", "Simone Leal"],       tipo: "serie", capa: null },
  { id: 15, titulo: "Neon City",          descricao: "Em 2087, uma cidade controlada por megacorporações esconde uma revolução que começa nas sombras de seus becos neon.", categoria: "Cyberpunk • Sci-Fi",  genero: "Cyberpunk", ano: 2024, avaliacao: "8.9", temporadas: 1, episodios: 8,  diretor: "Diego Ramos",    elenco: ["Priscila Maia", "Leandro Cruz", "Vanessa Pires"],     tipo: "serie", capa: null },
];

const SIMILARES_IDS = [2, 3, 4, 6, 7, 13];

function CardSimilar({ item }) {
  const navigate = useNavigate();

  return (
    <div className="card-similar" onClick={() => navigate(`/detalhes/${item.id}`)}>
      <div className="card-similar-poster">
        {item.capa
          ? <img src={item.capa} alt={item.titulo} />
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
  const [naWatchlist, setNaWatchlist] = useState(false);
  const [toastVisivel, setToastVisivel] = useState(false);

  const item = CATALOGO.find((c) => c.id === Number(id));

  if (!item) {
    navigate("/404");
    return null;
  }

  const similares = CATALOGO.filter(
    (c) => SIMILARES_IDS.includes(c.id) && c.id !== item.id
  ).slice(0, 6);

  function toggleWatchlist() {
    setNaWatchlist((v) => !v);
    setToastVisivel(true);
    setTimeout(() => setToastVisivel(false), 2500);
  }

  return (
    <div className="pagina-detalhes">

      <div className="detalhes-hero">
        <div className="detalhes-hero-bg">
          {item.capa && <img src={item.capa} alt={item.titulo} />}
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
            <button className="btn-primario">▶ Assistir</button>
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
              {item.elenco.map((ator) => (
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
          {naWatchlist ? "✓ Adicionado à Watchlist!" : "Removido da Watchlist"}
        </div>
      )}
    </div>
  );
}