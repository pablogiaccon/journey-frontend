export interface INewTripForm {
  location: string;
  date: Date;
  guests: Array<{ email: string }>;
}
