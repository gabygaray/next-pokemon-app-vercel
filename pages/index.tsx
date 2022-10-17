import { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";

import { pokeApi } from "../api";
import { Layout } from "../components/layouts/index";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title={"Listado de Pokémons"}>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

//Indica que en tiempo de build, llama a esta función (se ejecuta del lado del sv).
//Solo se puede utilizar en las pages, no en los componentes.
//Nada dentro de la fn llega del lado del cliente a excepción de las props.

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request. (Antes de que el usuario haga el req a la pagina)
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

//Son propiedades estaticas que son generadas a la hora del build de la app.
export const getStaticProps: GetStaticProps = async (ctx) => {
  //En el get especificamos la interface.
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      i + 1
    }.png`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
