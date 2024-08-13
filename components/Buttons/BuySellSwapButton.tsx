import React from 'react';
import styles from '@/styles/Exchange.module.css';
import { ArrowDownOutlined } from "@ant-design/icons";
import { TokenContract } from '@/lib/structure/types';

function swapTokens(sellTokenContract:TokenContract, 
  buyTokenContract:TokenContract,
  setSellTokenContract:any,
  setBuyTokenContract:any) {
  let tmpElement: TokenContract = buyTokenContract;
  setBuyTokenContract(sellTokenContract);
  setSellTokenContract(tmpElement);
}

type Props = {
  sellTokenContract:TokenContract, 
  buyTokenContract:TokenContract, 
  setSellTokenContract: (TokenContract: TokenContract) => void,
  setBuyTokenContract:  (TokenContract: TokenContract) => void
}

const BuySellSwapButton = ({
  sellTokenContract, 
  buyTokenContract, 
  setSellTokenContract, 
  setBuyTokenContract} : Props) => {
  return (
    <div className={styles.switchButton}>
      <ArrowDownOutlined className={styles.switchArrow} onClick={() => swapTokens(
        sellTokenContract, buyTokenContract, setSellTokenContract, setBuyTokenContract)}/>
    </div>
  );
}

export default BuySellSwapButton;
