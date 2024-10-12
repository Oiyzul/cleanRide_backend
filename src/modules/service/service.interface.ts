export type TService = {
  name: string;
  description: string;
  price: number;
  duration: number;
  imgUrl?: string;
  features: string[];
  unavailableFeatures?: string[];
  isDeleted: boolean;
};
