import { Spacer, Text, useTheme, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: " 0px 20px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image //Esta imagen generaría un error ya que no está siendo servida desde el directorio o del bundle de la aplicacion, ya que usa el StaticGeneration, y por lo que next no permite utilizar direcciones agenas por seguridad. Por lo que debe conf en next.config.js (Hay que bajar y volver a subir el proyecto para que se generen los cambios)
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png"
        alt="Icono de la App"
        width={70}
        height={70}
      />

      {/* Para que el Link reciba el URL de NextLink le ponemos el passHref */}
      <NextLink href="/" passHref>
        <Link>
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Link>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
