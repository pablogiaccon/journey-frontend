export interface INewTripForm {
  date: Date;
  email: string;
  guests: Array<{ email: string }>;
  location: string;
  name: string;
}
