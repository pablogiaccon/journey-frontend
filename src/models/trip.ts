import { DateRange } from "react-day-picker";

export interface INewTripForm {
  participants: Array<{ email: string }>;
  destination: string;
  ownerEmail: string;
  ownerName: string;
  rangeDate: DateRange | undefined;
}

export interface ITripDetails {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export interface ITripParticipant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export interface ITripLink {
  id: string;
  title: string;
  url: string;
}

export interface ITripActivity {
  id: string;
  title: string;
  occurs_at: Date;
}
