// interface for user registration
export interface Iuser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  _id?: string;
  type?: string;
  socialId?: string;
};