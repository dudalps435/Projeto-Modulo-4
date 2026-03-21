// Catálogo central de títulos — usado por PaginaInicio, PaginaDetalhes e WatchlistContext
// Edite aqui para refletir em todas as páginas automaticamente.

export const CATALOGO_FILMES = [
  { id: 2,  titulo: "Ruínas do Amanhã",   descricao: "Uma civilização às margens do colapso tenta reconstruir o que resta da humanidade após um evento catastrófico.", categoria: "Ficção Científica",    genero: "Sci-Fi",     ano: 2024, avaliacao: "8.4", duracao: "1h 54min", diretor: "Pedro Costa",    elenco: ["Ana Lima", "Bruno Reis", "Camila Torres"],          tipo: "filme", plataforma: "Prime",   status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop" },
  { id: 3,  titulo: "A Última Fronteira", descricao: "Exploradores adentram uma região inexplorada da Amazônia e encontram segredos que nunca deveriam ter sido descobertos.", categoria: "Aventura • Drama", genero: "Aventura",   ano: 2023, avaliacao: "7.9", duracao: "2h 05min", diretor: "Lucas Ferreira", elenco: ["Mariana Silva", "João Pedro", "Fernanda Luz"],        tipo: "filme", plataforma: "Disney+", status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1585647347385-e29b0a0f3e50?w=500&h=750&fit=crop" },
  { id: 4,  titulo: "Sombra Vermelha",    descricao: "Um detetive obcecado persegue um assassino em série que deixa mensagens codificadas apenas para ele.", categoria: "Thriller • Crime",      genero: "Thriller",   ano: 2024, avaliacao: "8.7", duracao: "1h 48min", diretor: "Clara Moura",    elenco: ["Rodrigo Bastos", "Nina Carvalho", "Thiago Monte"],    tipo: "filme", plataforma: "Netflix", status: "assistindo",     nota: 0, capa: "https://images.unsplash.com/photo-1520676179915-927b68303c4c?w=500&h=750&fit=crop" },
  { id: 5,  titulo: "Código Fantasma",    descricao: "Um hacker renegado descobre que o sistema que ele criou está sendo usado para controlar a população.", categoria: "Ação",                  genero: "Ação",       ano: 2023, avaliacao: "7.5", duracao: "1h 58min", diretor: "Fábio Nunes",    elenco: ["Tiago Ramos", "Cláudia Melo", "Rafael Dias"],         tipo: "filme", plataforma: "Prime",   status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1557983889-3ec0aaff1004?w=500&h=750&fit=crop" },
  { id: 6,  titulo: "Mar de Cinzas",      descricao: "Após uma tragédia familiar, uma mulher precisa reaprender a existir em um mundo que segue em frente sem ela.", categoria: "Drama • Premiado",   genero: "Drama",      ano: 2024, avaliacao: "9.0", duracao: "2h 22min", diretor: "Beatriz Cunha",  elenco: ["Helena Faria", "Ricardo Souza", "Tatiana Cruz"],      tipo: "filme", plataforma: "Netflix", status: "assistido",      nota: 5, capa: "https://images.unsplash.com/photo-1578733471386-f146f56e90f8?w=500&h=750&fit=crop" },
  { id: 7,  titulo: "Pulso",              descricao: "Um hospital psiquiátrico começa a registrar eventos inexplicáveis após a chegada de uma nova paciente.", categoria: "Horror • Suspense",      genero: "Horror",     ano: 2023, avaliacao: "8.2", duracao: "1h 42min", diretor: "Fábio Nunes",    elenco: ["Cristina Vieira", "Marcos Teles", "Amanda Rocha"],    tipo: "filme", plataforma: "Disney+", status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop" },
  { id: 8,  titulo: "Vento Norte",        descricao: "Uma jornalista investiga desaparecimentos misteriosos em uma pequena cidade do interior norueguês.", categoria: "Drama",                  genero: "Drama",      ano: 2022, avaliacao: "8.8", duracao: "2h 01min", diretor: "Marina Alves",   elenco: ["Luísa Borges", "Felipe Torres", "Ana Raquel"],        tipo: "filme", plataforma: "Prime",   status: "assistido",      nota: 4, capa: "https://images.unsplash.com/photo-1548689844-b5e0f75c6189?w=500&h=750&fit=crop" },
  { id: 9,  titulo: "Espelho Partido",    descricao: "Uma psicóloga descobre que os pesadelos de seus pacientes compartilham um elemento em comum.", categoria: "Suspense",               genero: "Suspense",   ano: 2024, avaliacao: "7.6", duracao: "1h 50min", diretor: "Renata Borges",  elenco: ["Paula Lima", "Henrique Costa", "Vera Santos"],        tipo: "filme", plataforma: "Netflix", status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1555991841-ca69f55fa619?w=500&h=750&fit=crop" },
];

export const CATALOGO_SERIES = [
  { id: 13, titulo: "Convergência",      descricao: "Cinco estranhos com passados interligados descobrem que suas vidas convergem para um único momento decisivo.", categoria: "Drama • Mistério",    genero: "Drama",      ano: 2024, avaliacao: "9.2", temporadas: 2, episodios: 16, diretor: "Renata Borges",  elenco: ["Daniel Fonseca", "Aline Costa", "Victor Hugo"],     tipo: "serie", plataforma: "Netflix", status: "assistido",      nota: 5, capa: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=750&fit=crop" },
  { id: 14, titulo: "Protocolo Zero",    descricao: "Uma agente de inteligência descobre que sua própria agência está comprometida e precisa operar completamente sozinha.", categoria: "Espionagem • Ação", genero: "Espionagem", ano: 2023, avaliacao: "8.6", temporadas: 3, episodios: 24, diretor: "Marcos Vidal",   elenco: ["Juliana Prado", "Eduardo Neto", "Simone Leal"],     tipo: "serie", plataforma: "Prime",   status: "assistindo",     nota: 0, capa: "https://images.unsplash.com/photo-1512149160596-da28e73a2e7b?w=500&h=750&fit=crop" },
  { id: 15, titulo: "Neon City",         descricao: "Em 2087, uma cidade controlada por megacorporações esconde uma revolução que começa nas sombras de seus becos neon.", categoria: "Cyberpunk • Sci-Fi", genero: "Cyberpunk",  ano: 2024, avaliacao: "8.9", temporadas: 1, episodios: 8,  diretor: "Diego Ramos",    elenco: ["Priscila Maia", "Leandro Cruz", "Vanessa Pires"],   tipo: "serie", plataforma: "Disney+", status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1560109520-543149ecf16b?w=500&h=750&fit=crop" },
  { id: 16, titulo: "As Filhas do Mar",  descricao: "Três irmãs descobrem que descendem de uma antiga linhagem de guardiãs do oceano, com poderes e responsabilidades inimagináveis.", categoria: "Fantasia",        genero: "Fantasia",   ano: 2023, avaliacao: "8.3", temporadas: 2, episodios: 14, diretor: "Clara Moura",    elenco: ["Sofia Drummond", "Beatriz Lima", "Camila Rocha"],   tipo: "serie", plataforma: "Netflix", status: "assistido",      nota: 4, capa: "https://images.unsplash.com/photo-1555848368-c8be68a99506?w=500&h=750&fit=crop" },
  { id: 17, titulo: "Verdade Fraturada", descricao: "Um jornalista investigativo desafia uma corporação poderosa ao descobrir provas de uma conspiração que atravessa décadas.", categoria: "Thriller",         genero: "Thriller",   ano: 2022, avaliacao: "9.0", temporadas: 4, episodios: 32, diretor: "Marcos Vidal",   elenco: ["André Souza", "Patrícia Vaz", "Guilherme Neto"],    tipo: "serie", plataforma: "Prime",   status: "assistido",      nota: 5, capa: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=750&fit=crop" },
  { id: 18, titulo: "Círculo de Fogo",   descricao: "Uma equipe de elite enfrenta ameaças sobrenaturais em missões ao redor do mundo, enquanto lida com segredos internos.", categoria: "Ação",             genero: "Ação",       ano: 2024, avaliacao: "7.8", temporadas: 1, episodios: 10, diretor: "Beatriz Cunha",  elenco: ["Carlos Maia", "Diana Rocha", "Fábio Leal"],         tipo: "serie", plataforma: "Disney+", status: "quero assistir", nota: 0, capa: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop" },
];

export const DESTAQUE_PADRAO = {
  id: 1,
  titulo: "Além do Horizonte",
  descricao: "Em um futuro próximo, uma espiã renegada descobre que a maior ameaça à humanidade não vem de fora — vem de dentro da própria organização que jurou proteger o mundo.",
  categoria: "Ação • Ficção Científica",
  genero: "Ação",
  ano: 2024,
  avaliacao: "9.1",
  duracao: "2h 18min",
  diretor: "Marina Alves",
  elenco: ["Sofia Drumond", "Rafael Mendes", "Isabela Neves"],
  tipo: "filme",
  plataforma: "Netflix",
  status: "quero assistir",
  nota: 0,
  capa: "https://images.unsplash.com/photo-1561825481-06fad5c65b25?w=500&h=750&fit=crop",
};

// Lista completa unificada (usada pela Watchlist)
export const CATALOGO_PADRAO = [DESTAQUE_PADRAO, ...CATALOGO_FILMES, ...CATALOGO_SERIES];
