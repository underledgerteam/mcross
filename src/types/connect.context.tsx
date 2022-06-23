import {ReactNode } from "react";
declare global {
  interface Window { ethereum: any, web3: any }
}
export interface ObjectNFTInterface {
  name?: string,
  description?: string,
  image?: string,
  dna?: string,
  edition?: number,
  date?: any,
  attributes?: [
    {
      trait_type?: string,
      value?: string
    }
  ],
  compiler?: string,

  id?: number, 
  rarity?: string, 
  chain?: string, 
  status?: string,
  tokenId?: string,
  nftContract?: string,
  price?: any,
  owner?: string,
  jsonUri?: string,
  approveBuy?: any,
  approve?: any,
  approveLoading?: any,
  selected?: boolean,
  fee?: string | number,
  to?: any
}
export interface Web3ProviderInterface {
  ChangeChain: (chainId: number)=> void,
  GetMyMarketplace: ()=> void,
  getMarketplaceList: ()=> void,
  getMarketplaceDetail: (id: string)=> void,
  GetByIdCollection: (id: string) => void,
  GetCollection: ()=> void,
  ConnectedWallet: ()=> void,
  CreateSellCollection: (
    objNFT: any,
    nftPrice: number,
    handleSuccess?:() => void,
    handleError?:() => void
  ) => void,
  CancelSellCollection: (
    objNFT: ObjectNFTInterface,
    handleSuccess?:() => void,
    handleError?:() => void
  ) => void,
  ConverseApproveNFT: (
    type: string, 
    objNFT: any,
    handleSuccess?: ()=> void,
    handleError?: ()=> void
  ) => void,
  ChangeConverseNFT: (type: string, objNFT?: ObjectNFTInterface) => void,
  ConverseNFT: (
    objConverse: ObjectNFTInterface,
    handleSuccess?:() => void,
    handleError?:() => void
  ) => void,
  BuyNFT: (objNFT: ObjectNFTInterface, handleSuccess?:() => void, handleError?:() => void) => void,
  getAllowanceWeth: (account: string, address: string) => void,
  isReload: boolean,
  nftContractCollection: any,
  nftContractMarketplace: any,
  nftContractMarketplaceList: any,
  chain: any,
  nftConverse: any,
  selectConverseNFT: ObjectNFTInterface,
  myMarketplace: listNFT,
  listMarketplace: listNFT,
  myCollection: listNFT,
  myCollectionById: dataNFT,
  detailMarketplace: dataNFT,
  owner: string,
  balance: number | string,
  account: string,
  mintNft: (mintAmount: number)=> void,
  mintProcessing: boolean,
  mintCost: any,
  calculateMintCost: (mintCost: number, mintAmount: number)=> void,
  cost: {
    mintCost: string,
    feeCost: string,
  },
  isConnectChain: string,
  checkConnectChain: ()=> void,
  nftContract: any,
  loadingMintPage: boolean,
  maxSupply: string,
  totalSupply: string,
  initMintPage: ()=> void,
}
export interface WalletProviderInterface {
  children: ReactNode
}
export interface mintCostInterface {
  token?: string,
  valueEth?: string | number,
  value: number,
  feeEth?: number,
  fee?: number,
}
export interface handleNewNotificationInterface { type: any, icon?: any, title?: string, message: string, position?: any }
export interface listNFT {
  list: ObjectNFTInterface[],
  loading: boolean,
}
export interface dataNFT {
  data: ObjectNFTInterface | ObjectNFTInterface[],
  loading: boolean,
}