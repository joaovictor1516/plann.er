export interface Activity{
    id: string | undefined;
    time: string | undefined;
    title: string | undefined;
}

export interface ActivityInformations{
    date: string;
    dateDayWeek: string;
    activities: Activity[] | undefined;
}