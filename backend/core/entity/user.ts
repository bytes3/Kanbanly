export interface User {
  accountId: string;
  username: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  gender?: string;
  city: string;
  country: string;
  state?: string;
  completedOnboarding: boolean;
}
