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

export interface PropertyImage {
  id: number;
  value: string;
}

export interface DetailedProperty {
  id: number;
  price: number;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
  images: PropertyImage[];
  type: string;
  status: string;
  currency: string;
  owner: string;
}

export interface Toast {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface EditPropertyBody {
  id: number;
  price?: number;
  endDate?: string;
  typeId?: number;
  statusId?: number;
  currencyId?: number;
  latitude?: number;
  longitude?: number;
}
