import { Button, SimpleGrid } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';

import { FoodCard } from '../../components/food-card';
import { RelevantKitchen } from '../../components/relevant-kitchen';
import { SectionBox } from '../../components/section-box/section-box.tsx';
import { SectionHeader } from '../../components/section-header';
import { favouritesRecipes, veganRecipes } from '../../mocks/recipes.ts';

const desc =
    'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.';

const title = 'Веганская кухня';

export const JuiciestPage = () => {
    return (
        <>
            <SectionHeader />
            <SectionBox>
                <SimpleGrid
                    columns={2}
                    gap={{ base: 3, md: 4 }}
                    maxWidth='100%'
                    minChildWidth={{ base: '300px', md: '450px' }}
                >
                    {favouritesRecipes.map((el) => (
                        <FoodCard {...el} key={el.id} />
                    ))}
                </SimpleGrid>
                <Center mt={4}>
                    <Button bg={'lime.400'}>Загрузить ещё</Button>
                </Center>
            </SectionBox>
            <RelevantKitchen title={title} description={desc} recipes={veganRecipes} />
        </>
    );
};
