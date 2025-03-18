import { useCallback } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export const useTrimInputBlur = <Form extends FieldValues>(setValue: UseFormSetValue<Form>) => {
    const handleBlur = useCallback(
        <Element extends HTMLInputElement>(field: Path<Form>) =>
            (e: React.FocusEvent<Element>) => {
                const trimmedValue = e.target.value.trim();

                setValue(field, trimmedValue as PathValue<Form, Path<Form>>, {
                    shouldValidate: true,
                });
            },
        [setValue],
    );

    return { handleBlur };
};
