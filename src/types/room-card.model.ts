export type RoomDescription = {
  roomCardId: number,
  city: string,
  isPremium: boolean,
  img: string,
  price: number,
  isFavorite: boolean,
  raiting: number,
  description: string,
  type: string,
  bedrooms: number,
  maxAdults: number,
  services: string[],
  host: HostComment
};

export type HostComment = {
  avatar: string,
  name: string,
  isPro: boolean,
  comment: string
}

export type RoomsDescription = RoomDescription[]


