//Colocando en corchetes el nombre del documento id, se generara un path para ese id especifico de forma dinamica.
//Con los corchetes indicamos que es un argumento dinámico.

import React, { useState } from "react";

import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Pokemon } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "../../utils/getPokemonInfo";

interface Props {
  pokemon: Pokemon;
}

export const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// Debería usar getStaticPaths si está pre-renderizando estáticamente páginas que usan rutas dinámicas
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    //Definimos que paths son aptos

    //De esta forma creamos los 151 paths necesarios para cada id
    paths: pokemons151.map((id) => ({
      params: { id },
    })),

    //De esta forma creariamos los paths unicos, por lo que hacer 151 sería mucho trabajo.
    // paths: [
    //   {
    //     params: {
    //       id: "1", //Tiene que ser estrictamente un string
    //     },
    //   },
    // ],
    fallback: false, //Esto nos indica si podemos desde el navegador colocar cualquier path que quisieramos, es decir por más que no este definido en paths, lo mismo podriamos acceder; si el valor es false entonces al intentar ingresar en un path no definido nos tiraría un 404. (Por defecto: 'blocking')
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Necesitamos leer id del ctx, por lo que desestructuramos el params

  const { id } = params as { id: string }; //Hacemos el tipado de esta forma para que sea menos compleja

  return {
    props: {
      pokemon: await getPokemonInfo(id), //El catch no se maneja porque si falla solo fallará en build-time
    },
  };
};

export default PokemonPage;
