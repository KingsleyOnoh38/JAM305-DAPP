import { ConnectWallet } from "@thirdweb-dev/react";

const Connectwallet = () => {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <ConnectWallet
              dropdownPosition={{
                side: "top",
                align: "center",
              }}
            />
          </div>
  );
}

export default Connectwallet;