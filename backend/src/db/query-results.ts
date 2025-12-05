export interface AccountQueryResult {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface UserQueryResult {
  account_id: string;
  username: string;
  first_name: string;
  last_name: string;
  date_birth: string;
  gender?: string;
  city: string;
  country: string;
  state?: string;
  completed_onboarding: boolean;
}
