import { Card, CardBody, CardHeader, Image, Stack, Tag, TagLabel, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/redux/api/types/recipes';

export const StepsBlock: FC<{ steps?: Recipe['steps'] }> = ({ steps }) =>
    steps?.map((step) => (
        <Card
            key={step.stepNumber}
            variant='outline'
            direction='row'
            minH={{ base: step?.image ? '128px' : '88px', xl: step?.image ? '244px' : '100px' }}
            borderRadius='--chakra-radii-lg'
        >
            {step?.image && (
                <Image
                    src={step?.image}
                    alt={step?.description}
                    objectFit='cover'
                    w={{ base: '158px', xl: '346px' }}
                />
            )}
            <Stack p={6}>
                <CardHeader p={0}>
                    <Tag
                        size='md'
                        p='4px 8px'
                        bg={step?.stepNumber === steps?.length ? 'lime.50' : 'blackAlpha.100'}
                    >
                        <TagLabel>Шаг {step?.stepNumber}</TagLabel>
                    </Tag>
                </CardHeader>
                <CardBody p={0}>
                    <Text fontSize='sm' lineHeight={5}>
                        {step?.description}
                    </Text>
                </CardBody>
            </Stack>
        </Card>
    ));
