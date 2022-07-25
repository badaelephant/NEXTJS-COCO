import "../styles/globals.css";
import "antd/dist/antd.css";
import { SessionProvider } from "next-auth/react";
import { Layout } from "antd";
import Nav from "../components/Common/Nav";
import Head from "next/head";
const { Header, Content, Footer } = Layout;
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout className="layout" style={{ fontFamily: "Roboto Mono" }}>
        <Nav />

        <Content
          style={{
            padding: "0 50px",
            backgroundColor: "white",
            minHeight: "calc(100vh - 134px)",
          }}
        >
          <Component {...pageProps} />
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          COCO ©2022 Created by - Chris Choi
        </Footer>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
