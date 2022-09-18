export type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export type User = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type NewReview = {
  comment: string;
  rating: number;
  roomId: string | undefined;
}

export type Reviews = Review[]

