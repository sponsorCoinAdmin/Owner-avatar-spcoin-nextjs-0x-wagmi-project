import React from 'react'
import styles from '../../styles/Exchange.module.css'

import {
    erc20ABI,
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    type Address,
} from "wagmi";
import { openDialog } from '../Dialogs/Dialogs';

const BURN_ADDRESS = "0x0000000000000000000000000000000000000000"
const ENV_ADDRESS:any = process.env.NEXT_PUBLIC_EXCHANGE_PROXY;
const EXCHANGE_PROXY:Address  = ENV_ADDRESS === undefined ? BURN_ADDRESS : ENV_ADDRESS
const MAX_ALLOWANCE = BigInt(process.env.NEXT_PUBLIC_MAX_ALLOWANCE === undefined ? "0" : process.env.NEXT_PUBLIC_MAX_ALLOWANCE)

function isBigInt(value:any) {
  // console.debug("isBigInt(" + value + ")");
  try { return BigInt(parseInt(value, 10)) !== BigInt(value) }
  catch (e) { return false }
}

function isNumber(value:any) {
  console.debug("isNumber:Value " + value)
  return !isNaN(value)
}

function isInteger(value:any) {
  return Number.isInteger(+value);
}

function isValidBigIntNotZero (value:any) {
  // console.debug("isValidBigIntNotZero(" + value + ")")
  if (isBigInt(value) && (BigInt(value) !== BigInt("0"))) {
      console.debug("isBigInt("+value +") Is Not 0")
      return true;
  }
  return false;
}

function isValidNumberNotZero (value:any) {
  // console.debug("isValidBigIntNotZero(" + value + ")")
  if (isNumber(value) && (Number(value) !== 0)) {
      console.debug("isNumber("+value +") Is Not 0")
      return true;
  }
  return false;
}

function isValidNotZero (value:any) {
  // console.debug("isValidBigIntNotZero(" + value + ")")
  if (isValidBigIntNotZero(value) || isValidNumberNotZero(value)){
      console.debug("Value "+value +"Is Not 0")
      return true;
  }
  return false;
}

function ApproveOrReviewButton({
    token,
    connectedWalletAddr,
    sellBalance,
    onClick,
    disabled,
    setErrorMessage
  }: {
    token:any
    connectedWalletAddr: Address;
    sellBalance: any
    onClick: () => void;
    disabled?: boolean;
    // setErrorMessage:any;
    setErrorMessage: (msg:Error) => void
  }) {
    // console.debug("++++++++++++++++++++++++++++++++++++++++++++++");
    // console.debug("ApproveOrReviewButton:disabled: " + disabled);
    // console.debug("isValidNumberNotZero:         :" + isValidNumberNotZero(sellBalance));
    let insufficientBalance = disabled || !isValidNumberNotZero(sellBalance)
    // console.debug("insufficientBalance:         :" + insufficientBalance);
    // console.debug("++++++++++++++++++++++++++++++++++++++++++++++");
    if (!insufficientBalance) {
      console.debug("connectedWalletAddr: " + connectedWalletAddr);
      console.debug("token.address      : " + token.address);
      console.debug("sellBalance        : " + sellBalance);
      // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
      const { isError, data: allowance, refetch } = useContractRead({
        address: token.address,
        abi: erc20ABI,
        functionName: "allowance",
        args: [connectedWalletAddr, EXCHANGE_PROXY],
        onError(error) {
          console.debug('***ERROR*** useContractRead Error', error.message)
          // alert(error.message)
          return <div>Something went wrong: {error.message}</div>;
        },
      });
      console.debug("ApproveOrReviewButton:AFTER useContractRead()");
      console.debug("isError:" + isError + " allowance:" + allowance + " refetch:"+ refetch);
      // if (!isError) {
      //   return <div>Something went wrong: {error.message}</div>;
      // }

      // 2. (only if no allowance): write to erc20, approve 0x Exchange Proxy to spend max integer
      const { config } = usePrepareContractWrite({
        address: token.address,
        abi: erc20ABI,
        functionName: "approve",
        args: [EXCHANGE_PROXY, MAX_ALLOWANCE],
        onError(error) {
          console.debug('***ERROR*** usePrepareContractWrite Error', error.message)
        }, 
        enabled: true
      });
      console.debug("ApproveOrReviewButton:AFTER usePrepareContractWrite()");
    
      const {
        data: writeContractResult,
        writeAsync: approveAsync,
        error,
      } = useContractWrite(config);

      console.debug("ApproveOrReviewButton:AFTER useContractWrite()");

      const { isLoading: isApproving } = useWaitForTransaction({
        hash: writeContractResult ? writeContractResult.hash : undefined,
        onSuccess(data) {
          refetch();
        },
      });

      console.debug("ApproveOrReviewButton:AFTER useWaitForTransaction()");

      if (error) {
        console.error("Something went wrong:\n" + JSON.stringify(error,null,2))
        setErrorMessage(error)
        // setErrorMessage({name:error.name , message:error.message})
        // return <div>Something went wrong: {error.message}</div>;
      }
    
      ///////////////////////////////////////////////////////////////

      function openFeedModal(feedType:string) {
        let dialog:any = document.querySelector(feedType)
        dialog.showModal();
      }

      // WORK HERE
      // Approve Button 
      if (allowance === 0n && approveAsync) {
        return (
          <>
            <button
              type="button"
              className={styles["exchangeButton"] + " " + styles["approveButton"]}
              onClick={async () => {
                const writtenValue = await approveAsync().catch(e => {openDialog("#errorDialog");});
                console.debug("writtenValue = " + writtenValue)
              }}
            >
              { isApproving ? "Approving…" : "Approve" }
            </button>
          </>
        );
      }
    }  

    return (
      <button
        type="button"
        disabled={insufficientBalance}
        onClick={onClick}
         className={styles["exchangeButton"] + " " + styles["swapButton"]}
      >
        {insufficientBalance ? "Insufficient " + token.symbol + " Balance" : "Review Trade"}
      </button>
    );
  }

export default ApproveOrReviewButton
