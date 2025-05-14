import { ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    ChakraProps,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { isArrayWithItems } from '~/utils/is-array-with-items';

type MultiSelectOption = {
    id: string;
    label: string;
    value: string;
};

interface MultiSelectProps<T extends FieldValues = FieldValues> extends ChakraProps {
    name: Path<T>;
    control: Control<T>;
    options: MultiSelectOption[];
    placeholder?: string;
    rules?: {
        required?: string | boolean;
        [key: string]: unknown;
    };
    shouldUnregister?: boolean;
}

export const MultiSelect = <T extends FieldValues = FieldValues>({
    name,
    control,
    options,
    placeholder = 'Выберите...',
    rules,
    shouldUnregister,
    ...rest
}: MultiSelectProps<T>) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
        shouldUnregister,
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => setIsOpen((prevState) => !prevState);

    const handleOptionClick = (value: string) => {
        const currentValues = isArrayWithItems(field.value) ? (field.value as string[]) : [];
        const newSelected = currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];

        field.onChange(newSelected);
    };

    const selectedValues = useMemo(
        () => (isArrayWithItems(field.value) ? (field.value as string[]) : []),
        [field.value],
    );
    const selectedOptions = useMemo(
        () => options.filter((option) => selectedValues.includes(option.value)),
        [options, selectedValues],
    );

    const displayedOptions = selectedOptions.slice(0, 2);
    const hasMoreTags = selectedOptions.length > 2;
    const hiddenCount = selectedOptions.length - 2;

    return (
        <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} closeOnSelect={false}>
            <Flex width='100%' maxWidth='350px'>
                <MenuButton
                    as={Button}
                    variant='outline'
                    width='100%'
                    height='auto'
                    minH='40px'
                    py={2}
                    borderColor={error ? 'red.500' : 'gray.200'}
                    boxShadow={error ? '0 0 0 1px #E53E3E' : 'none'}
                    borderRadius='md'
                    textAlign='left'
                    fontWeight={400}
                    onClick={handleMenuToggle}
                    _hover={{ borderColor: error ? 'red.500' : 'lime.300' }}
                    _active={{ borderColor: error ? 'red.500' : 'lime.400' }}
                    _focus={{
                        borderColor: error ? 'red.500' : 'lime.150',
                        boxShadow: error ? '0 0 0 1px #E53E3E' : 'none',
                    }}
                    rightIcon={
                        <ChevronUpIcon
                            style={{ transform: isOpen ? 'rotate(0turn)' : 'rotate(0.5turn)' }}
                        />
                    }
                    {...rest}
                >
                    <Flex wrap='wrap' gap={1} width='100%'>
                        {selectedOptions.length === 0 ? (
                            <Text color='gray.500'>{placeholder}</Text>
                        ) : (
                            <>
                                {displayedOptions.map((option) => (
                                    <Tag
                                        key={option.id}
                                        size='sm'
                                        borderRadius='md'
                                        variant='outline'
                                        bg='transparent'
                                        border='1px solid'
                                        borderColor='rgba(177, 255, 46, 1)'
                                        color='#7CB305'
                                        my={0.5}
                                    >
                                        <TagLabel>{option.label}</TagLabel>
                                    </Tag>
                                ))}
                                {hasMoreTags && (
                                    <Tag
                                        size='sm'
                                        borderRadius='md'
                                        variant='outline'
                                        bg='transparent'
                                        border='1px solid'
                                        borderColor='rgba(177, 255, 46, 1)'
                                        color='#7CB305'
                                        my={0.5}
                                    >
                                        <TagLabel>+{hiddenCount}</TagLabel>
                                    </Tag>
                                )}
                            </>
                        )}
                    </Flex>
                </MenuButton>
            </Flex>
            <MenuList width='350px' minWidth='350px' maxWidth='350px' maxH='300px' overflowY='auto'>
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        onClick={() => handleOptionClick(option.value)}
                        _hover={{ bg: 'lime.50' }}
                        _focus={{ bg: 'lime.50' }}
                    >
                        <Checkbox
                            isChecked={selectedValues.includes(option.value)}
                            colorScheme='green'
                            mr={2}
                            pointerEvents='none'
                        >
                            {option.label}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
