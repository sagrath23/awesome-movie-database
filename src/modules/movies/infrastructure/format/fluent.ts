import { Movie } from '../../domain/model';

const printRatings = (ratingList) => {
  let result = '';

  ratingList.forEach(
    ({ vendor, rating }) =>
      (result = result.concat(`\n- ${vendor}: ${rating}`)),
  );

  return result;
};

export const fluentFormat = ({
  title,
  releaseYear,
  language,
  ratingList,
  country,
  plot,
  actors,
}: Movie) => `
  Title: ${title}
  Release Year: ${releaseYear}
  Plot: ${plot}
  Country: ${country}
  Language ${language}
  ${ratingList.length > 0 ? `${title} ratings:${printRatings(ratingList)}` : ''}
  ${actors.length > 0 ? `${title} cast:\n${actors.join(',')}` : ''}
`;
