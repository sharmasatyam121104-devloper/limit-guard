import { Request } from "express";

export interface UserInterface {
    email: string;
    fullname: string;
    password: string;
    refresh_token?: string;
    last_login?: Date;
    profile_image_url?: string;
    auth_provider?: "google" | "local",
    role: "USER"
}

export interface UserProfileInterface {
  _id: string;
  email: string;
  fullname: string;
  last_login: string;
  profile_image_url: string;
  auth_provider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetMeResponseInterface {
  data: UserProfileInterface | null;
}

export interface SessionInterface extends Request{
    userId?: string;
    email?: string;
    role?: string;
}

export interface SignupResponseInterface {
    message: string
}

export interface LoginResponseInterface {
    message: string,
    access_token: string,
    refresh_token : string,
    user: UserProfileInterface
}

export interface UpadteProfileResponseInterface {
    message: string
}


export interface RotateTokenResponseInterface {
    message: string,
    access_token: string,
    refresh_token : string
}

export interface LogoutResponseInterface {
    message: string
}