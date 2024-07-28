import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";

import { ITripDetails } from "@models/index";
import { useTripDetailsService } from "@services/trips";

import { SpinLoader } from "@components/spin-loader";

interface ITripDetailsData {
  tripDetails: ITripDetails | undefined;
}

const TripDetailsContext = createContext<ITripDetailsData>(
  {} as ITripDetailsData
);

interface IProps {
  children: React.ReactNode;
}

export function TripDetailsProvider(props: IProps) {
  const { tripId } = useParams();
  const { data: tripDetails, isLoading } = useTripDetailsService({
    tripId: tripId,
  });

  return (
    <TripDetailsContext.Provider value={{ tripDetails }}>
      {isLoading ? <SpinLoader variant="secondary" /> : props.children}
    </TripDetailsContext.Provider>
  );
}

export function useTripDetailsContext() {
  const context = useContext(TripDetailsContext);

  if (isEmpty(context)) {
    throw new Error(
      "useTripDetailsContext must be used within a TripDetailsProvider!"
    );
  }

  return context;
}
