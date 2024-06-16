export interface UpdateFoodRequest {
  id: number;
  newName?: string;
  newPrice?: number;
  newRating?: number;
  newCategoryId?: number;
  newImage?: File | undefined;
  newIngredientsIds?: number[];
}
