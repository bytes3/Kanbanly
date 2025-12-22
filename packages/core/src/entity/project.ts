export interface InitProject {
  id?: string;
  name: string;
  description: string;
  createdAt?: string;
  board: {
    name: string;
    listNames: string[];
    createdAt?: string;
  };
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
