export interface IMovieSchedule {
  movie_id: number;
  studio_id: number;
  start_time: string;
  end_time: string;
  price: number;
  date: string;
}

export const movieSchedules: IMovieSchedule[] = [
  {
    movie_id: 1,
    studio_id: 1,
    start_time: '10:00',
    end_time: '15:00',
    price: 30_000,
    date: '2021-12-21',
  },
  {
    movie_id: 2,
    studio_id: 1,
    start_time: '15:30',
    end_time: '21:00',
    price: 30_000,
    date: '2021-12-21',
  },
  {
    movie_id: 1,
    studio_id: 2,
    start_time: '10:00',
    end_time: '15:00',
    price: 30_000,
    date: '2021-12-21',
  },
  {
    movie_id: 2,
    studio_id: 2,
    start_time: '15:30',
    end_time: '21:00',
    price: 30_000,
    date: '2021-12-21',
  },
];
