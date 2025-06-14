import { Box, Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { RecipeCardList } from '~/components/recipes-card-list';
import { Recipe } from '~/redux/api/types/recipes';
import { isArrayWithItems } from '~/utils/is-array-with-items';

import { userProfileHeaderDataType } from '../../utils/user-profile-headers';
import { ProfileBlockTitle } from '../profile-block-title';

type ProfileBlockProps = {
    data: {
        type: userProfileHeaderDataType;
        data: Recipe[];
    }[];
    headers: {
        title: string;
        count: number;
    }[];
};

export const ProfileBlock: FC<ProfileBlockProps> = ({ data, headers }) => {
    const [dataPages, setDataPages] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataState, setDataState] = useState<Recipe[]>([]);

    const onLoadMoreData = () => {
        setDataPages(2);
    };

    useEffect(() => {
        if (data.length !== 1) {
            const resultData = data.map((item) => item.data).flat();
            setDataState(resultData);
            setTotalPages(Math.ceil(resultData.length / 8));
        } else {
            setDataState(data[0].data);
            setTotalPages(Math.ceil(data[0].data.length / 8));
        }
    }, [data]);

    return (
        <Box>
            <Flex flexDirection={{ base: 'row' }} gap={6}>
                {headers.map((header, index) => {
                    if (index === 1 && header.count === 0) return null;
                    return <ProfileBlockTitle {...header} key={header.title} />;
                })}
            </Flex>
            {isArrayWithItems(dataState) && (
                <RecipeCardList
                    recipeList={dataPages === 1 ? dataState.slice(0, 8) : dataState}
                    currentPage={dataPages}
                    totalPages={totalPages}
                    loadMoreCallback={onLoadMoreData}
                    pt={{ base: 3, sm: 1 }}
                />
            )}
        </Box>
    );
};
