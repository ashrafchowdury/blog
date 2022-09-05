import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"/>
        {/* font-family: 'Lobster', cursive; */}

        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Lobster&display=swap"
          rel="stylesheet"
        />
        {/* font-family: 'Josefin Sans', sans-serif; */}
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        {/* font-family: 'Lexend Deca', sans-serif; */}

        <script
          src="https://kit.fontawesome.com/3e892a7f39.js"
          crossorigin="anonymous"
        ></script>

        <title>Learn Something New</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
