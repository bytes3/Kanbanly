import type { Board } from "../entity";
import * as entity from "../entity";

export const createEntitesContext = () => ({
  account: {
    id: "123124",
    email: "testuser@test.ro",
    createdAt: Date.now().toString(),
    passwordHash: "$2y$10$KO.NrR9c/VyJxzRUYznPseQkJYirTa3ThzcFilhULOsQOSWjqQT.G"
  } as entity.Account,
  sessionInfo: {
    accountId: "account-id",
    email: "test@test.ro",
    createdAt: new Date(Date.now()).toISOString()
  } as entity.SessionInfo,
  user: {
    id: "123",
    username: "BellyJohn88",
    firstName: "John",
    lastName: "Doe",
    city: "NY",
    country: "US",
    state: "NY",
    dateBirth: Date.now().toString(),
    gender: "Male",
    completedOnboarding: true
  } as entity.User,
  initProject: {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z",
    board: {
      name: "board-name",
      listNames: ["To Do", "In Progress", "In QA", "Done"],
      createdAt: "2022-01-12T06:15:00.000Z"
    }
  } as entity.InitProject,
  project: {
    id: "project-id",
    name: "project-name",
    description: "a new project to test on",
    createdAt: "2022-01-12T06:15:00.000Z"
  } as entity.Project,
  boards: [
    {
      id: "board-id",
      projectId: "project-id",
      name: "board-name",
      isDefault: true,
      position: 0,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    },
    {
      id: "board-id-2",
      projectId: "project-id",
      name: "board-name-2",
      isDefault: false,
      position: 1,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    }
  ] as [entity.Board, ...Board[]],
  boardList: [
    {
      id: "list-id",
      boardId: "board-id",
      name: "list-name",
      position: 0,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    },
    {
      id: "list-id-2",
      boardId: "board-id",
      name: "list-name-2",
      position: 1,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z"
    }
  ] as [entity.BoardList, ...entity.BoardList[]],
  boardListItems: [
    {
      id: "item-id",
      boardListId: "list-id",
      title: "item-title",
      description: "item-description",
      position: 0,
      createdAt: "2022-01-12T06:15:00.000Z",
      updatedAt: "2022-01-12T06:15:00.000Z",
      completedAt: "2022-01-12T06:15:00.000Z"
    }
  ] as [entity.BoardListItem, ...entity.BoardListItem[]]
});
