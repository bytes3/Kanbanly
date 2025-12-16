export interface User {
  id: string;
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
