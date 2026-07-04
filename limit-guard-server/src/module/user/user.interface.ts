export interface UserInterface {
    email: string;
    fullname: string;
    password: string;
    refresh_token?: string;
    last_login?: Date;
    profile_image_url?: string;
    auth_provider?: "google" | "local"
}

export interface SignupResponseInterface {
    message: string
}