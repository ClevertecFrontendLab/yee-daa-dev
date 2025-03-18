import * as Yup from 'yup';

const RussianRegex = /^[А-Яа-яЁё]/;
const basePattern = 'А-Яа-яЁё\\s\\-–';

export const extendYup = () => {
    Yup.addMethod(
        Yup.string,
        'russianOnly',
        function (msg = 'Только кириллица А-Я, пробел и "-"', allowPunctuation = false) {
            const punctuation = allowPunctuation ? '.,' : '';
            const pattern = new RegExp(`^[${basePattern}${punctuation}]+$`);

            return this.test({
                name: 'russian-only',
                message: msg,
                test: (value, testContext) => {
                    if (!value) {
                        return true;
                    }

                    if (!RussianRegex.test(value[0])) {
                        return testContext.createError({
                            message: 'Должно начинаться с кириллицы А-Я',
                        });
                    }

                    if (!pattern.test(value)) {
                        return testContext.createError({ message: msg });
                    }

                    return true;
                },
            });
        },
    );
};
