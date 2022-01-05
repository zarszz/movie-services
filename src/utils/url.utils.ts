import { IPaginationLinks } from 'nestjs-typeorm-paginate';

export function generateLinks<T>(
  paginationLink: IPaginationLinks,
  searchDto: T,
): IPaginationLinks {
  const keys = Object.keys(paginationLink);
  const searchKeys = Object.keys(searchDto).filter(
    (key) => key !== 'page' && key !== 'limit',
  );
  keys.forEach((key) => {
    if (paginationLink[key]) {
      searchKeys.map((searchKey) => {
        if (searchDto[searchKey]) {
          paginationLink[key] =
            paginationLink[key] + `&${searchKey}=${searchDto[searchKey]}`;
        }
      });
    }
  });
  return paginationLink;
}
