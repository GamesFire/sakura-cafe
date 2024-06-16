export interface CreateFoodRequest {
  name: string;
  price: number;
  rating: number;
  categoryId: number;
  image: File | undefined;
  ingredientsIds: number[];
}
