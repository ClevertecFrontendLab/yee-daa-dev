import { useCallback } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export const useTrimInputBlur = <Form extends FieldValues>(
    setValue: UseFormSetValue<Form>,
    shouldValidate = false,
) => {
    const handleBlur = useCallback(
        <Element extends HTMLInputElement>(field: Path<Form>) =>
            (e: React.FocusEvent<Element>) => {
                const trimmedValue = e.target.value.trim().replace(/\s+/g, ' ');

                setValue(field, trimmedValue as PathValue<Form, Path<Form>>, {
                    shouldValidate,
                });
            },
        [setValue, shouldValidate],
    );

    return { handleBlur };
};
