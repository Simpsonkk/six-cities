export type Review = {
  userId: number,
  cityId:number,
  cardId:number,
  avatar: string,
  name: string,
  isPro: boolean,
  raiting: number,
  comment: string,
  data: string
}

export type Reviews = Review[]

export type City = {
  lat: number,
  long: number
};
