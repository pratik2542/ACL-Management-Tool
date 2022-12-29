import Head from "next/head";
// import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

//********************** connect wallet imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";
import SetPermission from "../components/SetPermission";
import AuthorizeFullControl from "../components/AuthorizeFullControl";
import SendStream from "../components/SendStream";
import RevokeFullControl from "../components/RevokeFullControl";
import ViewPermissions from "../components/ViewPermissions";

//******************************************* */

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //********************** connect wallet imports

  const { chains, provider } = configureChains(
    [polygon, goerli],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  //********************** connect wallet imports

  const [showDashboard, setDashboard] = useState(false);
  const [showSetPermissions, SetSetPermissions] = useState(false);
  const [showAFC, setAFC] = useState(false);
  const [showSendStream, setSendStream] = useState(false);
  const [showRevokeFC, setRevokeFC] = useState(false);
  const [showViewPermissions, setViewPermissions] = useState(false);

  useEffect(() => {
    setDashboard(true);
  }, []);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#10bb35",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <Head>
            <title>ACL Tool</title>
            <meta
              name="description"
              content="Giving other accounts control over stream operations"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="">
            {/* ******************** Navbar ******************** */}

            <div className="navbar flex justify-between p-2 border-b-[1px] items-center">
              <div className="navbar-logo flex-auto w-64 pl-4">
                <h1 className="text-lg font-bold">ACL TOOL</h1>
              </div>
              <div className="connect-wallet">
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                />
              </div>
            </div>

            {/* ******************** main ******************** */}

            <div className="flex  min-h-screen">
              {/* ****************main left panel************** */}
              <div className="min-h-screen w-[300px] border-r-[1px] py-2 px-3 bg-white">
                <ul className="flex flex-col list-none cursor-pointer py-4 px-4 mt-4 gap-[10px]">
                  <div
                    className={
                      showDashboard
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(true);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <rect fill="none" height="24" width="24" />
                        <path d="M9,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v14C11,20.1,10.1,21,9,21z M15,21h4c1.1,0,2-0.9,2-2v-5 c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v5C13,20.1,13.9,21,15,21z M21,8V5c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v3c0,1.1,0.9,2,2,2h4 C20.1,10,21,9.1,21,8z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>Dashboard</div>
                  </div>
                  <div
                    className={
                      showSetPermissions
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(true);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <g>
                            <path d="M10.67,13.02C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V19c0,0.55,0.45,1,1,1 h8.26C10.47,18.87,10,17.49,10,16C10,14.93,10.25,13.93,10.67,13.02z" />
                            <circle cx="10" cy="8" r="4" />
                            <path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l0.84-0.73c0.18-0.16,0.22-0.42,0.1-0.63l-0.59-1.02c-0.12-0.21-0.37-0.3-0.59-0.22 l-1.06,0.36c-0.32-0.27-0.68-0.48-1.08-0.63l-0.22-1.09c-0.05-0.23-0.25-0.4-0.49-0.4h-1.18c-0.24,0-0.44,0.17-0.49,0.4 l-0.22,1.09c-0.4,0.15-0.76,0.36-1.08,0.63l-1.06-0.36c-0.23-0.08-0.47,0.02-0.59,0.22l-0.59,1.02c-0.12,0.21-0.08,0.47,0.1,0.63 l0.84,0.73c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-0.84,0.73c-0.18,0.16-0.22,0.42-0.1,0.63l0.59,1.02 c0.12,0.21,0.37,0.3,0.59,0.22l1.06-0.36c0.32,0.27,0.68,0.48,1.08,0.63l0.22,1.09c0.05,0.23,0.25,0.4,0.49,0.4h1.18 c0.24,0,0.44-0.17,0.49-0.4l0.22-1.09c0.4-0.15,0.76-0.36,1.08-0.63l1.06,0.36c0.23,0.08,0.47-0.02,0.59-0.22l0.59-1.02 c0.12-0.21,0.08-0.47-0.1-0.63l-0.84-0.73C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S18.1,18,17,18z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className={styles.link_text}>Set Permissions</div>
                  </div>
                  <div
                    className={
                      showAFC
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(true);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M2 21h10c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1zM5.24 8.07l2.83-2.83L20.8 17.97c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0L5.24 8.07zm8.49-5.66l2.83 2.83c.78.78.78 2.05 0 2.83l-1.42 1.42-5.65-5.66 1.41-1.41c.78-.79 2.05-.79 2.83-.01zm-9.9 7.07l5.66 5.66-1.41 1.41c-.78.78-2.05.78-2.83 0l-2.83-2.83c-.78-.78-.78-2.05 0-2.83l1.41-1.41z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>
                      Athorize Full Control
                    </div>
                  </div>
                  <div
                    className={
                      showSendStream
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(true);
                      setRevokeFC(false);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>Send Stream</div>
                  </div>
                  <div
                    className={
                      showRevokeFC
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(true);
                      setViewPermissions(false);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <path d="M18.7,4.51l-6-2.25c-0.45-0.17-0.95-0.17-1.4,0l-6,2.25C4.52,4.81,4,5.55,4,6.39v4.7c0,4.94,3.27,9.57,7.71,10.83 c0.19,0.05,0.39,0.05,0.57,0C16.73,20.66,20,16.03,20,11.09v-4.7C20,5.55,19.48,4.81,18.7,4.51z M14.8,14.79L14.8,14.79 c-0.39,0.39-1.02,0.39-1.41,0.01L12,13.42l-1.39,1.38c-0.39,0.39-1.02,0.39-1.41,0l0,0c-0.39-0.39-0.39-1.02,0-1.41L10.59,12 L9.2,10.61c-0.39-0.39-0.39-1.02,0-1.41c0.39-0.39,1.02-0.39,1.41,0L12,10.59l1.39-1.39c0.39-0.39,1.02-0.39,1.41,0l0,0 c0.39,0.39,0.39,1.02,0,1.41L13.42,12l1.38,1.38C15.19,13.77,15.19,14.4,14.8,14.79z" />
                        </g>
                      </svg>
                    </div>
                    <div className={styles.link_text}>Revoke Full Control</div>
                  </div>
                  <div
                    className={
                      showViewPermissions
                        ? `${styles.left_ul_link} ${styles.active}`
                        : `${styles.left_ul_link}`
                    }
                    onClick={() => {
                      setDashboard(false);
                      SetSetPermissions(false);
                      setAFC(false);
                      setSendStream(false);
                      setRevokeFC(false);
                      setViewPermissions(true);
                    }}
                  >
                    <div className={styles.link_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <rect fill="none" height="24" width="24" />
                        <path d="M4,14h2c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,13.55,3.45,14,4,14z M4,19h2c0.55,0,1-0.45,1-1 v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,18.55,3.45,19,4,19z M4,9h2c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H4 C3.45,5,3,5.45,3,6v2C3,8.55,3.45,9,4,9z M9,14h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2 C8,13.55,8.45,14,9,14z M9,19h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2C8,18.55,8.45,19,9,19z M8,6v2 c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H9C8.45,5,8,5.45,8,6z" />
                      </svg>
                    </div>
                    <div className={styles.link_text}>View Permissions</div>
                  </div>
                </ul>
              </div>
              {/* ****************main right panel************** */}
              <div className="w-full">
                <div className="inside-main-right">
                  {showDashboard ? (
                    <Dashboard />
                  ) : showSetPermissions ? (
                    <SetPermission />
                  ) : showAFC ? (
                    <AuthorizeFullControl />
                  ) : showSendStream ? (
                    <SendStream />
                  ) : showRevokeFC ? (
                    <RevokeFullControl />
                  ) : showViewPermissions ? (
                    <ViewPermissions />
                  ) : null}
                </div>
              </div>
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
