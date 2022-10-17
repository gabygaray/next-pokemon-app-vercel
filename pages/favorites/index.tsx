import { useState, useEffect } from "react";

import { Layout } from "../../components/layouts";
import { FavoritePokemons } from "../../components/pokemon";
import { NoFavorites } from "../../components/ui/";
import { localFavorites } from "../../utils";

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  // De esta forma al igual que lo hicimos en la ruta D:\GABRIEL GARAY\LEARNING\CURSOS\CODE\Cursos\Next.js\02-pokemon-static\utils\localFavorites.ts en la funcion existInFavorites evitamos crashear la app al consultar el objeto window en el back.
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokémons - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
