export type PersonalInfoFormData = {
    firstName: string;
    lastName: string;
    email: string;
};

export type CredentialsFormData = {
    login: string;
    password: string;
    repeatPassword: string;
};

export type SignUpFormData = PersonalInfoFormData & CredentialsFormData;
