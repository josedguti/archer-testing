import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css";
import AuthCheckWrapper from "../modules/Common/AuthCheckWrapper";
import "antd/dist/antd.css";
import "../styles/tailwindGlobal.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
