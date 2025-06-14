import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);
dayjs.extend(isoWeek);

export const transformDateByWeek = (data: { count: number; date: string }[]) => {
    if (!data.length) return [];

    const minDateRaw = dayjs.min(data.map((d) => dayjs(d.date)));
    if (!minDateRaw) return [];
    const minDate = minDateRaw.startOf('isoWeek');

    const grouped: Record<string, number> = {};

    data.forEach(({ count, date }) => {
        const currentDate = dayjs(date).startOf('day');
        const diffDays = currentDate.diff(minDate, 'day');
        const weekIndex = Math.floor(diffDays / 7);
        const weekStartDate = minDate.add(weekIndex * 7, 'day');
        const formattedDate = weekStartDate.format('MMM D');
        if (!grouped[formattedDate]) grouped[formattedDate] = 0;
        grouped[formattedDate] += count;
    });

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
};
