 export interface UserDataIntaerface {
  // Important Data (Required)
  _id: string;
  email: string;
  fullname: string;
  role: string;

  // Optional Data
  last_login?: string;
  profile_image_url?: string | null;
  auth_provider?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface LoginInputDataInterface {
  email: string;
  password: string;
}