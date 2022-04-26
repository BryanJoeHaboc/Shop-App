export interface User {
  email: string;
  password: string;
}

export interface LoggedInUser {
  jwtToken: string | "";
  userId: string | "";
  firstName: string | "";
  lastName: string | "";
  userType: string | "";
}

export interface SignUpUser extends User {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  userType: string;
}
