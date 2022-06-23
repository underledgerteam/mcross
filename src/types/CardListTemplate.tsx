export interface CardListTemplateInterface {
  id: number, 
  name: string, 
  owner?: string, 
  textAction: string, 
  price: number, 
  image: string, 
  rarity: string, 
  chain: string, 
  sell?: boolean, 
  onClick: ()=> void, 
  onClickAction : ()=> void
 }