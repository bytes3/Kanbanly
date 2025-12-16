export interface Account {
  id: string;
  email: string;
  createdAt: string;
  passwordHash: string;
}

export interface SessionInfo {
  accountId: string;
  email: string;
  createdAt: string;
}

export type Token = string;
