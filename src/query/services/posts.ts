import { ApiEndpoints } from '@query/constants/api.ts';
import { ApiGroupNames } from '@query/constants/api-group-names.ts';
import { EndpointNames } from '@query/constants/endpoint-names.ts';
import { Tags } from '@query/constants/tags.ts';
import { apiSlice } from '@query/create-api.ts';

export const postsApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.POSTS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getPosts: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.POSTS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.POSTS,
                    name: EndpointNames.GET_POSTS,
                }),
                providesTags: [Tags.POSTS],
            }),
        }),
    });

export const { useGetPostsQuery } = postsApiSlice;
