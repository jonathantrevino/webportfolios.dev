export interface UserType {
  uid: string;
  title: string | null;
  setup: boolean;
  photoURL: string | null;
  newsletter: boolean | null;
  emailVisible: boolean;
  email: string;
  displayName: string;
}
