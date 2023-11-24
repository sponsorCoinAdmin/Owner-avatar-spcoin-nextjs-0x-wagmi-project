import React from "react";
// import styles from "../../styles/App.module.css";
import styles from "../../../styles/Header.module.css";

import spCoin_png from '../images/spCoin.png'

import eth_png from '../images/eth.png'
import Image from 'next/image'


import Link from 'next/link'

function MoralisHeader(address: string, isConnected: any, connect: React.MouseEventHandler<HTMLDivElement> | undefined) {
  return (
    <>
      <div className={styles.leftH}>
        <Image src={spCoin_png} width={25} height={25} alt="Sponsor Coin Logo" />
        <div className={styles.headerItem}><Link href="/Recipients">Recipients</Link></div>
        <div className={styles.headerItem}><Link href="/Agents">Agents</Link></div>
        <div className={styles.headerItem}><Link href="/Tokens">Tokens</Link></div>
        <div className={styles.headerItem}><Link href="/SpCoin">SpCoin</Link></div>
        <div className={styles.headerItem}><Link href="/Moralis">Moralis</Link></div>
     </div>
      <div className={styles.rightH}>
        <div className={styles.headerItem}>
        <Image src={eth_png} width={25} height={25} alt="Ethereum Logo" />
        &nbsp;&nbsp;Ethereum
        </div>
        <div className={styles.connectButton} onClick={connect}>
          {isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "Connect"}
        </div>
      </div>
    </>
  );
}

export default MoralisHeader;
