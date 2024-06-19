import type { FC } from "react";
import Box from "@mui/material/Box";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { GridRenderCellParams, GridRowModes } from "@mui/x-data-grid";
import { useImageUrls } from "@/hooks/useImageUrls";

interface FoodsImageCellRendererProps extends GridRenderCellParams {
  rowModesModel: any;
  handleFoodsImageUpload: (
    id: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FoodsImageCellRenderer: FC<FoodsImageCellRendererProps> = (params) => {
  const { rowModesModel, handleFoodsImageUpload } = params;
  const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit;

  const foodImagePath = params.value ? [params.value] : [];
  const foodImageUrl = useImageUrls(foodImagePath);

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
          style={{ width: "100%", height: "120px", objectFit: "cover" }}
        />
      ) : params.value ? (
        <img
          src={foodImageUrl[0]}
          alt={params.row.name}
          style={{ width: "100%", height: "120px", objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "120px",
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
          onChange={handleFoodsImageUpload(params.row.id)}
        />
      )}
    </Box>
  );
};

export default FoodsImageCellRenderer;
