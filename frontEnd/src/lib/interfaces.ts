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

export interface Link{
    id: string;
    title: string;
    url: string;
    completed: boolean | undefined; //remover o undefined depois de adicionar o campo completed na tabela dos links do bd.    
}