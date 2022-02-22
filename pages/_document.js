import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const meta = {
      title: "Dabble Lab | Archer",
      description: "Developer education and acceleration solutions.",
      image: "/images/social-prev-dark.png",
    };

    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="follow, index" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="px-0 antialiased selection:bg-purple-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
