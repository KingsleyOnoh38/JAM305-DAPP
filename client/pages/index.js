import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>   

          <div className={styles.connect} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <ConnectWallet
              dropdownPosition={{
                side: "top",
                align: "center",
              }}
            />
          </div>
        </div>
    </main>
  );
}
