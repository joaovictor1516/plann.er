export interface Activity{
    id: string;
    occurs_at: string;
    title: string;
    is_complited: boolean;   
}

export interface ActivityInformations{
    date: string;
    dateDayWeek: string;
    activities: Activity[] | undefined;
}

export interface Link{
    id: string;
    title: string;
    url: string; 
}

export interface Invite{
    id: string,
    email: string;
    name: string | undefined;
    is_owner: boolean;
    is_confirmed: boolean;
}