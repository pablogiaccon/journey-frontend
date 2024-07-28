import { useMutation, useQuery } from "@tanstack/react-query";

import { IUseTripServices, TCreateNewActivity } from "./trips.type";
import { api } from "@lib/axios";
import {
  INewTripForm,
  ITripDetails,
  ITripLink,
  ITripParticipant,
} from "@models/index";

const useTripDetailsService = ({ tripId }: IUseTripServices) => {
  return useQuery({
    queryKey: ["trip-details", { tripId }],
    queryFn: async () => {
      if (!tripId) return undefined;

      const response = await api.get<{ trip: ITripDetails }>(
        `/trips/${tripId}`
      );

      return response.data.trip;
    },
  });
};

const useTripParticipantsService = ({ tripId }: IUseTripServices) => {
  return useQuery({
    queryKey: ["trip-participants", { tripId }],
    queryFn: async () => {
      if (!tripId) return undefined;

      const response = await api.get<{ participants: ITripParticipant[] }>(
        `/trips/${tripId}/participants`
      );

      return response.data.participants;
    },
  });
};

const useTripLinksService = ({ tripId }: IUseTripServices) => {
  return useQuery({
    queryKey: ["trip-links", { tripId }],
    queryFn: async () => {
      if (!tripId) return undefined;

      const response = await api.get<{ links: ITripLink[] }>(
        `/trips/${tripId}/links`
      );

      return response.data.links;
    },
  });
};

const useCreateTripService = () => {
  return useMutation({
    mutationFn: (tripData: INewTripForm) => {
      return api.post<{ tripId: string }>("/trips", {
        destination: tripData.destination,
        starts_at: tripData.rangeDate?.from,
        ends_at: tripData.rangeDate?.to,
        emails_to_invite: tripData.participants.map((mail) => mail.email),
        owner_name: tripData.ownerName,
        owner_email: tripData.ownerEmail,
      });
    },
  });
};

const useInviteParticipant = ({ tripId }: IUseTripServices) => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => {
      return api.post(`/trips/${tripId}/invites`, {
        email,
      });
    },
  });
};

const useCreateActivity = ({ tripId }: IUseTripServices) => {
  return useMutation({
    mutationFn: ({ occurs_at, title }: TCreateNewActivity) => {
      return api.post<{ activityId: string }>(`/trips/${tripId}/activities`, {
        occurs_at,
        title,
      });
    },
  });
};

export {
  useTripDetailsService,
  useTripParticipantsService,
  useTripLinksService,
  useCreateTripService,
  useInviteParticipant,
  useCreateActivity,
};
