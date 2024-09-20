export interface UserType {
  uid: string;
  title: string | null;
  setup: boolean;
  photoURL: string | null;
  newsletter: boolean | null;
  emailVisible: boolean;
  email: string;
  displayName: string;
  update_id?: string;
}

export interface PortfolioType {
  likes: number;
  photoURL: string[];
  portfolioURL: string;
  views: number;
  user_id: string;
}
