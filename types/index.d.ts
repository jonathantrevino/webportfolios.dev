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
  uniqueViews: number;
  totalViews: number;
  user_id: string;
  user_displayName?: string;
  user_photoURL?: string;
  user_title?: string;
}
