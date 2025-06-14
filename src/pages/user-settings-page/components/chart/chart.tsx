import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { CHART_GRID_STYLES, CHART_TICK_STYLES } from '../../constants';
import { transformDateByWeek } from '../../utils';

type ChartBlockProps = {
    chartData: { date: string; count: number }[];
    viewData: {
        icon: React.JSX.Element;
        colorChart: string;
        title: string;
    };
};

export const ChartBlock: React.FC<ChartBlockProps> = ({ chartData, viewData }) => {
    const transformedData = transformDateByWeek(chartData);

    return (
        <VStack spacing='10px' align='left'>
            <HStack spacing='6px' px='6px'>
                {viewData.icon}
                <Text
                    fontSize='xs'
                    lineHeight={4}
                    fontWeight={600}
                    color='var(--chakra-colors-lime-600)'
                >
                    {chartData.length} {viewData.title}
                </Text>
            </HStack>
            {!!chartData.length && (
                <Box w='1091px' h='304px'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={transformedData}>
                            <CartesianGrid {...CHART_GRID_STYLES} />
                            <XAxis
                                dataKey='date'
                                tick={CHART_TICK_STYLES}
                                tickCount={7}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => (value === 0 ? '' : value)}
                            />
                            <YAxis
                                tick={CHART_TICK_STYLES}
                                ticks={[0, 20, 40, 60, 80, 100, 120]}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => (value === 0 ? '' : value)}
                            />
                            <Tooltip />
                            <Line
                                type='linear'
                                dataKey='count'
                                stroke={viewData.colorChart}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </VStack>
    );
};
