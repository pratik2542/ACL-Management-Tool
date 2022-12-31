import React, { useState } from "react";
import Blockies from "react-blockies";

function ViewPermissions({ setViewPermissions, setRevokeFC, setOperatorAdd }) {
  return (
    <div className="main-container">
      <div className="box-container">
        <div className="set-permission-title">
          <span className="permission-title">All Permissions</span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="text-center font-medium">Address</th>
              <th className="text-center font-medium">Permission</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* start of mapping for permissions */}
            <tr className="font-medium border-b-[1px]">
              <td className="flex items-center ">
                <Blockies
                  seed="0x619058Cc41aB48e0Ac3D86B09C7bFEs8B8b0dcbe"
                  size={10}
                  scale={3}
                  className="identicon rounded-lg mr-2"
                />
                {"0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(0, 6) +
                  "..." +
                  "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length - 5,
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length
                  )}
              </td>
              <td className="text-center">
                <span className="py-[6px] px-[16px] bg-[#10bb3514] rounded-lg text-[#10bb35]">
                  Create
                </span>
              </td>
              <td>
                <button
                  className="py-[6px] px-[16px] bg-[#10bb35] text-white rounded-lg"
                  onClick={() => {
                    setOperatorAdd(
                      "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe"
                    );

                    setViewPermissions(false);
                    setRevokeFC(true);
                  }}
                >
                  Revoke
                </button>
              </td>
            </tr>
            {/* end of mapping for permissions */}
            {/* start of mapping for permissions */}
            <tr className="font-medium border-b-[1px]">
              <td className="flex items-center ">
                <Blockies
                  seed="0x619058Cc41aB48e0Ac3D86B09C7bsE68B8b0dcbe"
                  size={10}
                  scale={3}
                  className="identicon rounded-lg mr-2"
                />
                {"0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(0, 6) +
                  "..." +
                  "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length - 5,
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length
                  )}
              </td>
              <td className="text-center">
                <span className="py-[6px] px-[16px] bg-[#10bb3514] rounded-lg text-[#10bb35]">
                  Delete or Update
                </span>
              </td>
              <td>
                <button
                  className="py-[6px] px-[16px] bg-[#10bb35] text-white rounded-lg"
                  onClick={() => {
                    setOperatorAdd(
                      "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe"
                    );

                    setViewPermissions(false);
                    setRevokeFC(true);
                  }}
                >
                  Revoke
                </button>
              </td>
            </tr>
            {/* end of mapping for permissions */}
            {/* start of mapping for permissions */}
            <tr className="font-medium border-b-[1px]">
              <td className="flex items-center ">
                <Blockies
                  seed="0x619058Cc41aB48e0Ac3D86B09C7sFE68B8b0dcbe"
                  size={10}
                  scale={3}
                  className="identicon rounded-lg mr-2"
                />
                {"0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(0, 6) +
                  "..." +
                  "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length - 5,
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length
                  )}
              </td>
              <td className="text-center">
                <span className="py-[6px] px-[16px] bg-[#10bb3514] rounded-lg text-[#10bb35]">
                  Update
                </span>
              </td>
              <td>
                <button
                  className="py-[6px] px-[16px] bg-[#10bb35] text-white rounded-lg"
                  onClick={() => {
                    setOperatorAdd(
                      "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe"
                    );

                    setViewPermissions(false);
                    setRevokeFC(true);
                  }}
                >
                  Revoke
                </button>
              </td>
            </tr>
            {/* end of mapping for permissions */}
            {/* start of mapping for permissions */}
            <tr className="font-medium border-b-[1px]">
              <td className="flex items-center ">
                <Blockies
                  seed="0x619058Cc41aB48e0Ac3D86B09C7bFE68d8b0dcbe"
                  size={10}
                  scale={3}
                  className="identicon rounded-lg mr-2"
                />
                {"0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(0, 6) +
                  "..." +
                  "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".substring(
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length - 5,
                    "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe".length
                  )}
              </td>
              <td className="text-center">
                <span className="py-[6px] px-[16px] bg-[#10bb3514] rounded-lg text-[#10bb35]">
                  Create, Update, or Delete
                </span>
              </td>
              <td>
                <button
                  className="py-[6px] px-[16px] bg-[#10bb35] text-white rounded-lg"
                  onClick={() => {
                    setOperatorAdd(
                      "0x619058Cc41aB48e0Ac3D86B09C7bFE68B8b0dcbe"
                    );

                    setViewPermissions(false);
                    setRevokeFC(true);
                  }}
                >
                  Revoke
                </button>
              </td>
            </tr>
            {/* end of mapping for permissions */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPermissions;
