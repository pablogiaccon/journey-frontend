import { ITripActivity } from "@models/index";

export interface IUseTripServices {
  tripId: string | undefined;
}

export type TCreateNewActivity = Omit<ITripActivity, "id">;
