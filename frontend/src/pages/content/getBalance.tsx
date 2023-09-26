import { useState } from 'react'
import Web3 from 'web3'

const HDWalletProvider = require('@truffle/hdwallet-provider')

declare global {
  interface Window {
    ethereum: any
  }
}

export default function getBalance () {
  const [inputAddress, setInputAddress] = useState<string>('')
  const [wallerBalance, setWalletBalance] = useState<string>('')

  const onClick = async () => {
    console.log('click!')
    const web3 = new Web3(window.ethereum)
    web3.eth.getBalance(inputAddress).then( (weiBalance: bigint) => {
      const ethBalance = parseFloat(web3.utils.fromWei(weiBalance, 'ether')).toFixed(10)
      setWalletBalance(ethBalance)
    })
  }

  return (
    <main 
      className={
        'mx-auto flex flex-col justify-center items-center h-full w-full bg-blue-900 \
        gap-4 p-4'
      }>
      <div className={'text-white text-[36px]'}>
        {'getBalance Function'}
      </div>
      <div className={'flex flex-col justify-center items-center gap-4'}>
        <input 
          type={'text'}
          className={'rounded-xl text-black w-[500px] p-4 shadow-inner'}
          value={inputAddress}
          onChange={(e) => {setInputAddress(e.target.value)}}
        />

        <div 
          className={'rounded-xl bg-gray-700 hover:bg-gray-900 p-2'} 
          onClick={() => onClick()}
        >
          {'check your Account!'}
        </div>

        <div
          className={'text-center'}
        >
          {wallerBalance && `${wallerBalance} ETH`}
        </div>

      </div>
    </main>
  )
}

