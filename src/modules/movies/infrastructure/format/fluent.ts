import { Movie } from '../../domain/model';

export const fluentFormat = ({ title }: Movie) => `
  ${title} is a movie released at
`;
