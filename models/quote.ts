import { User } from './user';

export interface Quote {
  quote_id: number;
  quote: string;
  upvotes: number;
  downvotes: number;
  score: number;
  created_at: Date;
  user: User;
}
