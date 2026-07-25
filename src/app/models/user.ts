export type User = {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
}

export type SignUpParams = {
    name: string;
    email: string;
    password: string;
    checkout?: boolean;
    dialogId: string;
}

export type SignInParams = Omit<SignUpParams, 'name'>;
export type LoginPayload = Pick<SignUpParams, 'email' | 'password'>;
export type RegisterPayload = Omit<SignUpParams, 'dialogId'>;