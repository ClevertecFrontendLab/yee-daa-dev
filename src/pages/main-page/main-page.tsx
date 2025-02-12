import { BlogSection } from '../../components/blog-section';
import { Carousel } from '../../components/carousel';
import { FavouritesBlock } from '../../components/favourites-block';
import { RelevantKitchen } from '../../components/relevant-kitchen';
import { SectionHeader } from '../../components/section-header';
import { relevantVegan } from '../../mocks/relevant-vegan.ts';

const desc =
    'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.';

const title = 'Веганская кухня';

export const MainPage = () => {
    return (
        <>
            <SectionHeader />
            <Carousel />
            <FavouritesBlock />
            <BlogSection />
            <RelevantKitchen title={title} description={desc} recipes={relevantVegan} />
        </>
    );
};
