import React from "react";

import { useRouter } from "next/router";
import { Card, Grid, Row, Text } from "@nextui-org/react";

import { SmallPokemon } from "../../interfaces";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
    //De esta forma le pasamos a la ruta el id del pokemon que seleccionamos, redirigiendonos a esa ruta.
    //Es recomendable siempre indexar enlaces que poseen nombre, facilita el trabajo para los bots de google y mejorar el SEO de la página.
  };

  return (
    <Grid
      xs={6} //Se define el tamaño de la tarjeta para que sea responsive.
      sm={3}
      md={2}
      xl={1}
      key={pokemon.id}
    >
      <Card hoverable clickable onClick={onClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={pokemon.img} width="100%" height={240} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
