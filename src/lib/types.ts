export interface UserInfo {
  username: string | null;
  token: string | null;
  roles: string[] | null;
}

export interface LoginResponse {
  token: string;
  expiration: Date;
  roles: string[];
}

export interface ShowcaseProperty {
  id: number;
  thumbnail: string;
  type: string;
  status: string;
  currency: string;
  price: number;
}

export interface PropertyDetails {
  id: number;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
  propertyImages: string[];
  propertyType: string;
  propertyStatus: string;
  currency: string;
  price: number;
}
