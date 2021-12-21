export type IMovie = {
  title: string;
  overview: string;
  play_until: string;
  tags: string[];
  poster: string;
};

export const movies: IMovie[] = [
  {
    poster: '/VlHt27nCqOuTnuX6bku8QZapzO.jpg',
    tags: ['1', '2', '3'],
    title: 'Spider-Man: No Way Home',
    overview:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.'.substr(
        0,
        200,
      ),
    play_until: '2021-12-15',
  },
  {
    tags: ['1', '2', '3'],
    overview:
      'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.'.substr(
        0,
        200,
      ),
    poster: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
    play_until: '2021-09-30',
    title: 'Venom: Let There Be Carnage',
  },
  {
    tags: ['1', '2', '3'],
    overview:
      "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.".substr(
        0,
        200,
      ),
    poster: '/wdE6ewaKZHr62bLqCn7A2DiGShm.jpg',
    play_until: '2021-11-04',
    title: 'Red Notice',
  },
];
