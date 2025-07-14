/**
 * Representa um restaurante (venue), com personalização de layout e moeda.
 */
export type Venue = {
  id: number;
  name: string;
  webSettings: {
    bannerImage: string;
    backgroundColour: string;
    primaryColour: string;
    primaryColourHover: string;
    navBackgroundColour: string;
  };
  currency: string;
};

/**
 * Store global com dados de customização da aplicação.
 */
export type VenueStore = {
  venue: Venue | null;
  isLoading: boolean;
  fetchVenue: () => Promise<void>;
};
