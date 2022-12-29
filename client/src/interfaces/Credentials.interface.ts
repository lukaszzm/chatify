export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends Credentials {
  firstName: string;
  lastName: string;
  profileImage: string | null;
}
