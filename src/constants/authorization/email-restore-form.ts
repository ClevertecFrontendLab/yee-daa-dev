import * as yup from 'yup';

export const EmailRestoreSchema = yup.object().shape({
    email: yup.string().required('Обязательное поле'),
});
