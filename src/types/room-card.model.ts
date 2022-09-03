// export type RoomDescription = {
//   roomCardId: number,
//   city: string,
//   location: Location,
//   isPremium: boolean,
//   img: string,
//   price: number,
//   isFavorite: boolean,
//   raiting: number,
//   description: string,
//   type: string,
//   bedrooms: number,
//   maxAdults: number,
//   services: string[],
//   host: HostComment
// };

// type Location = {
//   lat: number,
//   lng: number
// }

// export type HostComment = {
//   avatar: string,
//   name: string,
//   isPro: boolean,
//   comment: string
// }

// export type RoomsDescription = RoomDescription[]


export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type RoomDescription = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
  id: number;
};

export type RoomsDescription = RoomDescription[]
