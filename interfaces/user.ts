export interface User {
  email: string;
  password: string;

}

export interface LoggedInUser extends User {
  jwtToken: string;
}

export interface SignUpUser extends User {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  userType: string;
}
