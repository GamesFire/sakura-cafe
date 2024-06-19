import type { FC } from "react";
import Box from "@mui/material/Box";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { GridRenderCellParams, GridRowModes } from "@mui/x-data-grid";
import { useImageUrls } from "@/hooks/useImageUrls";

interface IngredientsImageCellRendererProps extends GridRenderCellParams {
  rowModesModel: any;
  handleIngredientsImageUpload: (
    id: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const IngredientsImageCellRenderer: FC<IngredientsImageCellRendererProps> = (
  params
) => {
  const { rowModesModel, handleIngredientsImageUpload } = params;
  const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit;

  const ingredientImagePath = params.value ? [params.value] : [];
  const ingredientImageUrl = useImageUrls(ingredientImagePath);

  const handleClick = () => {
    if (isInEditMode) {
      document.getElementById(`fileInput-${params.row.id}`)?.click();
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{ cursor: isInEditMode ? "pointer" : "default" }}
    >
      {params.value instanceof File ? (
        <img
          src={URL.createObjectURL(params.value)}
          alt={params.row.name}
          style={{ width: "100%", height: "140px", objectFit: "cover" }}
        />
      ) : params.value ? (
        <img
          src={ingredientImageUrl[0]}
          alt={params.row.name}
          style={{ width: "100%", height: "140px", objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed grey",
          }}
        >
          <InsertPhotoIcon />
        </Box>
      )}
      {isInEditMode && (
        <input
          type="file"
          id={`fileInput-${params.row.id}`}
          style={{ display: "none" }}
          onChange={handleIngredientsImageUpload(params.row.id)}
        />
      )}
    </Box>
  );
};

export default IngredientsImageCellRenderer;
