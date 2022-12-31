import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { createClient } from "urql";
import { getTransactionDescription } from "@superfluid-finance/sdk-core";
import ConnectWalletCustom from "./ConnectWalletCustom";
import { sign } from "crypto";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";

function Dashboard() {
  const { address, isConnected } = useAccount();
  // const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(true);

  const [dropDownAll, setDropDownAll] = useState(true);
  const [dropDownIncoming, setDropDownIncoming] = useState(true);
  const [dropDownOutgoing, setDropDownOutgoing] = useState(true);

  //integration
  const [allData, setAllData] = useState([]);
  const [incomingData, setIncomingData] = useState([]);
  const [outgoingData, setOutgoingData] = useState([]);
  const [total, setTotal] = useState([]);
  const [balance, setBalane] = useState();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const loadData = async () => {
    const APIURL =
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli";

    const tokensQuery_outgoing = `
    query {
    flowUpdatedEvents(
      where: {sender: "0xf96b82579B8f4E0357908AE50a10f2287A19Baa9"}
      orderBy: timestamp
    ) {
      timestamp
      sender
      receiver
      flowRate
      totalAmountStreamedUntilTimestamp
      flowOperator
      token
    }
    }
  `;

    const tokensQuery_incoming = `
    query {
    flowUpdatedEvents(
      where: {receiver: "0xf96b82579B8f4E0357908AE50a10f2287A19Baa9"}
      orderBy: timestamp
    ) {
      timestamp
      sender
      receiver
      flowRate
      totalAmountStreamedUntilTimestamp
      flowOperator
      token
    }
    }
  `;

    const client = createClient({
      url: APIURL,
    });
    const loadedData_outgoing = await client
      .query(tokensQuery_outgoing)
      .toPromise();

    const loadedData_incoming = await client
      .query(tokensQuery_incoming)
      .toPromise();

    const data = loadedData_outgoing.data.flowUpdatedEvents;

    const data1 = loadedData_incoming.data.flowUpdatedEvents;
    total.push([data.length + data1.length, data.length, data1.length]);
    setTotal(total);

    console.log(loadedData_outgoing);
    console.log(loadedData_incoming);
    for (let i = 0; i < data.length; i++) {
      if (!outgoingData.find((item) => loadedData_outgoing[0] === item[0])) {
        const d = new Date(parseInt(data[i].timestamp) * 1000);
        const date =
          String(d.getDate()) +
          " " +
          String(monthNames[d.getMonth()]) +
          ". " +
          String(d.getFullYear());
        outgoingData.push([
          data[i].sender,
          data[i].receiver,
          data[i].flowOperator,
          ethers.utils.formatEther(data[i].totalAmountStreamedUntilTimestamp),
          date,
        ]);
        allData.push([
          data[i].receiver,
          data[i].flowOperator,
          ethers.utils.formatEther(data[i].totalAmountStreamedUntilTimestamp),
          date,
          true,
        ]);
      }
    }

    for (let i = data1.length - 1; i >= 0; i--) {
      if (!incomingData.find((item) => loadedData_incoming[0] === item[0])) {
        const d = new Date(parseInt(data1[i].timestamp) * 1000);
        const date =
          String(d.getDate()) +
          " " +
          String(monthNames[d.getMonth()]) +
          ". " +
          String(d.getFullYear());
        incomingData.push([
          data1[i].sender,
          data1[i].receiver,
          data1[i].flowOperator,
          ethers.utils.formatEther(data1[i].totalAmountStreamedUntilTimestamp),
          date,
        ]);
        allData.push([
          data1[i].sender,
          data1[i].flowOperator,
          ethers.utils.formatEther(data1[i].totalAmountStreamedUntilTimestamp),
          date,
          false,
        ]);
      }
    }

    setOutgoingData(outgoingData);
    setIncomingData(incomingData);
    setAllData(allData);
    console.log(outgoingData);
    console.log(incomingData);
    console.log(allData);
  };

  const getBalance = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        const sf = await Framework.create({
          chainId: 5,
          provider: provider,
        });

        const DAIxContract = await sf.loadSuperToken("fDAIx");
        const DAIx = DAIxContract.address;

        try {
          const b = await DAIxContract.balanceOf({
            account: account,
            providerOrSigner: signer,
          });
          const bal = ethers.utils.formatEther(b);
          setBalane(bal);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDropDown(false);
    setDropDownAll(false);
    setDropDownIncoming(false);
    setDropDownOutgoing(false);
  }, []);

  useEffect(() => {
    getBalance();
  });

  if (isConnected) {
    return (
      <div className="db-main">
        <div className="db-sub">
          {/* <button onClick={() => loadData()}>click</button> */}
          {/* <p>Connect your wallet, view any wallet, or take a look around!</p> */}
          <div className="db-box-parent">
            {/* <h1 className="super-token">"Super Token"</h1> */}

            <div className="db-box">
              <div className="db-header flex justify-between w-full items-center">
                <div className="dashboard-title">
                  <span className="super-token-title">Super Token</span>
                </div>
                <div className="connect-wallet ">
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                    showBalance={{
                      smallScreen: false,
                      largeScreen: false,
                    }}
                  />
                </div>
              </div>
              <div className="token-details">
                <table>
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Balance</th>
                      <th>Net Flow</th>
                      <th>Inflow/Outflow</th>
                      <th>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#000000"
                        >
                          <g>
                            <rect fill="none" height="24" width="24" />
                            <rect fill="none" height="24" width="24" />
                          </g>
                          <g>
                            <g>
                              <path d="M17.29,5.71L17.29,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,9.58L8.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59C17.68,6.73,17.68,6.1,17.29,5.71z" />
                              <path d="M17.29,12.3L17.29,12.3c-0.39-0.39-1.02-0.39-1.41,0L12,16.17l-3.88-3.88c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59C17.68,13.32,17.68,12.69,17.29,12.3z" />
                            </g>
                          </g>
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="token-icon">
                          <div aria-label="" className="svg-parent">
                            <svg
                              data-cy="animation"
                              viewBox="0 0 36 36"
                              className="fdaix-token-svg"
                            >
                              <clipPath id="clip">
                                <polygon points="18,18, 30.5,0 36,10.2"></polygon>
                              </clipPath>
                              <mask id="mask">
                                <rect
                                  x="-3"
                                  y="-3"
                                  width="42"
                                  height="42"
                                  fill="white"
                                ></rect>
                                <polygon
                                  points="18,18, 30.5,0 36,10.2"
                                  fill="black"
                                ></polygon>
                              </mask>
                              <circle
                                mask="url(#mask)"
                                r="17.5px"
                                cx="18"
                                cy="18"
                                stroke="#10BB35FF"
                                stroke-width="1"
                                fill="transparent"
                              ></circle>
                              <circle
                                clipPath="url(#clip)"
                                r="17px"
                                cx="18"
                                cy="18"
                                strokeDasharray="2"
                                stroke="#10BB35FF"
                                stroke-width="2"
                                fill="transparent"
                              ></circle>
                            </svg>
                            <div
                              class="MuiAvatar-root MuiAvatar-circular token-avatar-parent"
                              data-cy="token-icon"
                            >
                              <img
                                alt="fDAIx token icon"
                                src="https://raw.githubusercontent.com/superfluid-finance/assets/master/public//tokens/dai/icon.svg"
                                class="MuiAvatar-img avatar-token"
                              ></img>
                            </div>
                          </div>
                          <h4 className="fdaix">fDAIx</h4>
                        </div>
                      </td>
                      <td>
                        <h4 className="token-balance">{balance}</h4>
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        <div
                          className="parent-drop-down"
                          onClick={() => {
                            loadData();
                            setDropDown(!dropDown);
                            setDropDownAll(!dropDownAll);
                          }}
                        >
                          <svg
                            class={
                              dropDown
                                ? "drop-down-svg active"
                                : "drop-down-svg"
                            }
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="ExpandCircleDownOutlinedIcon"
                          >
                            <path d="M15.08 9.59 12 12.67 8.92 9.59 7.5 11l4.5 4.5 4.5-4.5-1.42-1.41zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                          </svg>
                        </div>
                      </td>
                    </tr>

                    {dropDown ? (
                      <tr>
                        <td colSpan={5} className="dropdown-table-td">
                          <div>
                            <table className="dropdown-table">
                              <thead>
                                <tr>
                                  <td colSpan={6} className="dropdown-table-td">
                                    <div className="dropdown-row">
                                      <div className="dropdown-btn-parent">
                                        <button
                                          className={
                                            dropDownAll ? "active" : ""
                                          }
                                          onClick={() => {
                                            setDropDownAll(true);
                                            setDropDownIncoming(false);
                                            setDropDownOutgoing(false);
                                          }}
                                        >
                                          {total.length > 0
                                            ? "All (" + total[0][0] + ")"
                                            : "All"}
                                        </button>
                                        <button
                                          className={
                                            dropDownIncoming ? "active" : ""
                                          }
                                          onClick={() => {
                                            setDropDownAll(false);
                                            setDropDownIncoming(true);
                                            setDropDownOutgoing(false);
                                          }}
                                        >
                                          {total.length > 0
                                            ? "Incoming (" + total[0][2] + ")"
                                            : "Incoming"}
                                        </button>
                                        <button
                                          className={
                                            dropDownOutgoing ? "active" : ""
                                          }
                                          onClick={() => {
                                            setDropDownAll(false);
                                            setDropDownIncoming(false);
                                            setDropDownOutgoing(true);
                                          }}
                                        >
                                          {total.length > 0
                                            ? "Outgoing (" + total[0][1] + ")"
                                            : "Outgoing"}
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>To / From</th>
                                  <th>All Time Flow</th>
                                  <th>Flow Rate</th>
                                  <th>Flow Operator</th>
                                  <th>Start / End Date</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {/**************all flow data************/}
                                {dropDownAll && allData.length > 0
                                  ? allData.map((item, key) => {
                                      return (
                                        <tr>
                                          <td>
                                            {item[4] ? (
                                              <h6>
                                                -&gt;&nbsp;{item[0].slice(0, 5)}
                                                ...
                                                {item[0].slice(38, 42)}
                                              </h6>
                                            ) : (
                                              <h6>
                                                &lt;-&nbsp;{item[0].slice(0, 5)}
                                                ...
                                                {item[0].slice(38, 42)}
                                              </h6>
                                            )}
                                          </td>
                                          <td>{item[2]}</td>
                                          <td>-</td>
                                          <td>
                                            {item[1].slice(0, 5)}...
                                            {item[1].slice(38, 42)}
                                          </td>
                                          <td>{item[3]}</td>
                                        </tr>
                                      );
                                    })
                                  : null}
                                {/**************outgoing flow data************/}
                                {dropDownOutgoing && outgoingData.length > 0
                                  ? outgoingData.map((item, key) => {
                                      return (
                                        <tr>
                                          <td>
                                            -&gt;&nbsp;
                                            {item[1].slice(0, 5)}...
                                            {item[1].slice(38, 42)}
                                          </td>
                                          <td>{item[3]}</td>
                                          <td>-</td>
                                          <td>
                                            {item[2].slice(0, 5)}...
                                            {item[2].slice(38, 42)}
                                          </td>
                                          <td>{item[4]}</td>
                                        </tr>
                                      );
                                    })
                                  : null}
                                {/**************incoming flow data************/}
                                {dropDownIncoming && incomingData.length > 0
                                  ? incomingData.map((item, key) => {
                                      return (
                                        <tr>
                                          <td>
                                            &lt;-&nbsp;
                                            {item[0].slice(0, 5)}...
                                            {item[0].slice(38, 42)}
                                          </td>
                                          <td>{item[3]}</td>
                                          <td>-</td>
                                          <td>
                                            {item[2].slice(0, 5)}...
                                            {item[2].slice(38, 42)}
                                          </td>
                                          <td>{item[4]}</td>
                                        </tr>
                                      );
                                    })
                                  : null}
                                {/* <tr>
                                  <td>something</td>
                                  <td>something</td>
                                  <td>something</td>
                                  <td>something</td>
                                  <td>something</td>
                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="db-main">
      <div className="db-sub">
        <h1>Connect to Superfluid</h1>
        <p>Connect your wallet, view any wallet, or take a look around!</p>
        <div className="db-grid-sub">
          <div className="grid-sub min-h-[120px]">
            <span className="grid-sub-title">Set Permissions</span>
            <span className="grid-sub-info">Update Operator Permissions</span>
          </div>
          <div className="grid-sub min-h-[120px]">
            <span className="grid-sub-title">Authorize Full Control</span>
            <span className="grid-sub-info">
              Grant Full Operator Permissions to an Account
            </span>
          </div>
          <div className="grid-sub min-h-[120px]">
            <span className="grid-sub-title">Revoke Full Control</span>
            <span className="grid-sub-info">
              Revoke Full Operator Permissions to an Account
            </span>
          </div>
          <div className="grid-sub min-h-[120px]">
            <span className="grid-sub-title">Send a Stream</span>
            <span className="grid-sub-info">
              Pick a Sender, Recipient, Token and Network
            </span>
          </div>
          <div className="grid-sub min-h-[120px]">
            <span className="grid-sub-title">Modify and Cancle Streams</span>
            <span className="grid-sub-info">
              Update Flow Rate and Delete a Stream using Operator Control
            </span>
            <div className="edit-delete flex items-center justify-center mt-4">
              <button className="p-[6px] bg-[#10bb3514] rounded-xl">
                <svg
                  className="fill-[#10bb35] w-6"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="EditIcon"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
              </button>
              <button className="p-[6px] bg-[#d2252514] rounded-xl ml-3">
                <svg
                  className="fill-[#d22525] w-6"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="CancelIcon"
                >
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="grid-sub min-h-[120px]">
            <span className="grid-sub-title">View Permissions</span>
            <span className="grid-sub-info">
              View All Addresses to whom permissions are given
            </span>
          </div>
        </div>
        <div className="custom-wallet w-80 mx-auto my-8">
          <ConnectWalletCustom />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
