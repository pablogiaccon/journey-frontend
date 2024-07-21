import { DateRange } from "react-day-picker";

export interface INewTripForm {
  guests: Array<{ email: string }>;
  location: string;
  ownerEmail: string;
  ownerName: string;
  rangeDate: DateRange | undefined;
}
