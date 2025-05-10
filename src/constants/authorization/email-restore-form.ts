import * as yup from 'yup';

import { EmailValidation } from './sign-up-form';

export const EmailRestoreSchema = yup.object().shape({
    email: EmailValidation,
});

export type EmailRestoreFormSchema = yup.InferType<typeof EmailRestoreSchema>;
