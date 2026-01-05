export interface ServerMessage {
  ok: string;
  serverError: string;
}

export const AccountRegisterMessage: ServerMessage & {
  alreadyExist: string;
} = {
  ok: "Account is registered successfully",
  serverError: "Account couln't be created",
  alreadyExist: "The account already exist"
};

export const AccountLoginMessage: ServerMessage & {
  wrongPassword: string;
  wrongEmail: string;
} = {
  ok: "Login success",
  serverError: "Failed to login",
  wrongPassword: "Wrong password. Try another",
  wrongEmail: "Email doesn't exist"
};

export const UserCreationMessage: ServerMessage & {
  alreadyExist: string;
  usernameAlreadyExist: string;
} = {
  ok: "User created successfully",
  serverError: "Failed to create user",
  alreadyExist: "User is already created",
  usernameAlreadyExist: "Username is already in use, Try another"
};

export const UserOnboardingStatusMessage = {
  userDidNotFinishedOnboarding: "Account user is not initialised",
  serverError: "Failed to update onboarding status"
};

export const UserGetMessage = {
  serverError: "Failed to get user"
};

export const ProjectCreationMessage = {
  serverError: "Failed to create project"
};

export const ProjectMessage = {
  doesntExist: "User has no projects"
};

export const BoardMessage = {
  boardList: {
    doesntExist: "User did not create any board list"
  },
  boardItem: {
    doesntExist: "USer did not create any tasks"
  }
};
