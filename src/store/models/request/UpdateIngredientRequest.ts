export interface UpdateIngredientRequest {
  id: number;
  newTitle?: string;
  newImage?: File | undefined;
}
