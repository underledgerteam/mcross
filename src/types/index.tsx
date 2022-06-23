export interface objNFTInterface {
  attributes?: [
    {
      trait_type?: string,
      value?: string
    }
  ],
  compiler: string,
  date: number,
  description: string,
  dna: string,
  edition: number,
  image: string,
  jsonUri: string,
  name: string,
  price: number,
}
