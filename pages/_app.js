import "../styles/globals.css";
import { NhostAuthProvider } from "@nhost/react-auth";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { nhost } from "../utils/nhost";
import Store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <NhostAuthProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <Store>
          <Component {...pageProps} />
        </Store>
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}

export default MyApp;
