export interface Board {
  id: string;
  projectId: string;
  name: string;
  isDefault: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface BoardList {
  id: string;
  boardId: string;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface BoardListItem {
  id: string;
  boardListId: string;
  title: string;
  description: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  completedAt: string;
}
