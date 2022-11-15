import moment from 'moment';

export type Page<T> = {
  data: T[];
  cursor?: string;
}

export type Clip = {
    id: string;
    title: string;
    viewCount: number;
    url: string;
    thumbnailUrl: string;
    createdAt: moment.Moment;
}