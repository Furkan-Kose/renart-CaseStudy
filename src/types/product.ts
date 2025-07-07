export type Product = {
  id: number;
  name: string;
  popularityScore: number;
  weight: number;
  price: number;
  popularityOutOfFive: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}