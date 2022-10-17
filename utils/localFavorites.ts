const toggleFavorite = (id: number) => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  if (typeof window === "undefined") return false; //Esto lo hacemos ya que al consultar el localStorage en el back para generar el codigo estatico, este mismo no posee objeto window por lo que nos crashearia la app. De esta forma se soluciona. Es recomendable escribir esta linea de código para asegurarse que el codigo no genere problemas. // Otra forma de solucionarlo es crear un useEffect.

  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return favorites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { toggleFavorite, existInFavorites, pokemons };
