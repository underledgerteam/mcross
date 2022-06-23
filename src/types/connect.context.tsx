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
  ChangeChain: any,
  GetMyMarketplace: any,
  getMarketplaceList: any,
  getMarketplaceDetail: any,
  GetByIdCollection: any,
  GetCollection: any,
  ConnectedWallet: any,
  CreateSellCollection: any,
  CancelSellCollection: any,
  ConverseApproveNFT: any,
  ChangeConverseNFT: any,
  ConverseNFT: any,
  BuyNFT: any,
  getAllowanceWeth: any,
  isReload: any,
  nftContractCollection: any,
  nftContractMarketplace: any,
  nftContractMarketplaceList: any,
  chain: any,
  nftConverse: any,
  selectConverseNFT: any,
  myMarketplace: any,
  listMarketplace: any,
  myCollection: any,
  myCollectionById: any,
  detailMarketplace: any,
  owner: any,
  balance: any,
  account: any,
  mintNft: any,
  mintProcessing: any,
  mintCost: any,
  calculateMintCost: any,
  cost: any,
  isConnectChain: any,
  checkConnectChain: any,
  nftContract: any,
  loadingMintPage: any,
  maxSupply: any,
  totalSupply: any,
  initMintPage: any,
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