export interface Movie {
  id: number;
  name: string;
  image: string;
}

export const movies: Movie[] = [
  { id: 0, name: "Amelie", image: "img/amelie.webp" },
  { id: 1, name: "Black Hawk Down", image: "img/black-hawk-down.webp" },
  {
    id: 2,
    name: "The Good The Bad and The Ugly",
    image: "img/clint-eastwood.webp",
  },
  { id: 3, name: "Nile City", image: "img/nile-city.webp" },
  { id: 4, name: "Idiocracy", image: "img/idiocracy.webp" },
  { id: 5, name: "Jackie Brown", image: "img/jackieBrown.webp" },
  { id: 6, name: "Jönssonligan", image: "img/jonssonligan.webp" },
  { id: 7, name: "Jurassic Park", image: "img/jurassic-park.webp" },
  { id: 8, name: "Leif & Billy", image: "img/leifBilly.webp" },
  { id: 9, name: "Morran & Tobias", image: "img/morranTobias.webp" },
  { id: 10, name: "Papphammar", image: "img/papphammar.webp" },
  { id: 11, name: "Predator", image: "img/predator.webp" },
  { id: 12, name: "Det Sjunde Inseglet", image: "img/sjunde-inseglet.webp" },
  { id: 13, name: "Sällskapsresan", image: "img/sallskapsresan.webp" },
  { id: 14, name: "Terminator 2", image: "img/terminator2.webp" },
  { id: 15, name: "The Big Lebowski", image: "img/big-lebowski.webp" },
  { id: 16, name: "Talladega Nights", image: "img/talladega-nights.webp" },
  { id: 17, name: "Top Gun", image: "img/top-gun.webp" },
  { id: 18, name: "Tonari no Totoro", image: "img/totoro.webp" },
];
