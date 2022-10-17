import React, { PropsWithChildren } from "react";
import Head from "next/head";

import { Navbar } from "../ui/index";

type Props = { title?: string }; //Esto indica que es opcional

// TS para FC con children y props
export const Layout: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  //Lo realizamos de esta forma porque en el lado del servidor no poseemos el objeto window.
  const origin = typeof window === "undefined" ? "" : window.location.origin;

  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Gabriel Garay" />
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        {/*De esta forma configuramos lo que se mostrará a la hora de compartirse la pagina en una red social como facebook. Es necesario que la imagen tenga un url estático, es decir,  el url que va a poseer la img cuando se haga el deploy de la pagina*/}
        <meta
          property="og:title"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
