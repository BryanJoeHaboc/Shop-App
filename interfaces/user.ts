export interface User {
  email: string;
  password: string;
}
type Nullable<T> = T | null;
export interface LoggedInUser {
  token: Nullable<string>;
  userId: Nullable<string>;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  userType: Nullable<string>;
}

export interface SignUpUser extends User {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  userType: string;
}
