import { ObjectNFTInterface } from "./connect.context"

export interface CardListTemplateInterface extends ObjectNFTInterface {
  textAction: string, 
  sell?: boolean, 
  onClick: ()=> void, 
  onClickAction : ()=> void
 }