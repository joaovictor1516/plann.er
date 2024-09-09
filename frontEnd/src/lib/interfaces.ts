export interface Activity{
    id: string;
    occurs_at: string;
    title: string;
}

export interface ActivityInformations{
    date: string;
    dateDayWeek: string;
    activities: Activity[] | undefined;
}