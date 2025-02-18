export interface UserGet {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string;
}

export interface UserShortGet {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
}

export interface UserSet {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface UserRatingGet {
    user: UserShortGet;
    score: number;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    user: UserGet;
    token: string;
}

export interface UserRegister {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export interface UserRegisterResponse {
    
}