import { BlogSection } from '../../components/blog-section';
import { Carousel } from '../../components/carousel';
import { FavouritesBlock } from '../../components/favourites-block';
import { SectionHeader } from '../../components/section-header';

export const MainPage = () => {
    return (
        <>
            <SectionHeader />
            <Carousel />
            <FavouritesBlock />
            <BlogSection />
        </>
    );
};
