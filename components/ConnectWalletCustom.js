import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Blockies from "react-blockies";

function ConnectWalletCustom() {
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div
                    style={{ display: "flex", gap: 12 }}
                    className="parent-custom-connect-button"
                  >
                    {/* <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button> */}

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="custom-connect-button hover:bg-[#f9f9f9] rounded-lg"
                    >
                      <div className="custom-btn-inside-parent flex justify-between items-center ml-2 py-2 px-3">
                        <Blockies
                          className="identicon rounded-lg"
                          seed={"acl-too"}
                          size={12}
                          scale={3}
                        />
                        <div className="custom-btn-address pl-[20px]">
                          <h2 className="leading-[150%] font-medium tracking-[0.15px] text-[1rem]">
                            {account.displayName}
                          </h2>
                          <h2 className="text-[0.875rem] tracking-[0.17px] leading-[1.43] text-left text-[#10bb35]">
                            Connected
                          </h2>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      {/* {openConnectModal && (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      )} */}

      {/* {openChainModal && (
        <button onClick={openChainModal} type="button">
          Open Chain Modal
        </button>
      )} */}
      {/* {openConnectModal ? (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      ) : openAccountModal ? (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      ) : null} */}
    </>
  );
}

export default ConnectWalletCustom;
