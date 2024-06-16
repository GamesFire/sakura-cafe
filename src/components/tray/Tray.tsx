import { type FC, useState, useRef, MouseEvent } from "react";
import { Button } from "@mui/material";
import TrayModal from "./TrayModal";

const Tray: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  const handleOrderSuccess = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        ref={anchorRef}
        className="btn before:inline-block before:w-6 before:h-6 before:content-trayIcon"
        sx={{
          paddingBlock: "0.5rem",
          paddingInline: "0.75rem",
          borderRadius: "16px",
        }}
        onClick={handleToggle}
      >
        <span className="ml-2">Таця</span>
      </Button>
      <TrayModal
        open={open}
        onClose={handleClose}
        onOrderSuccess={handleOrderSuccess}
        anchorRef={anchorRef}
      />
    </div>
  );
};

export default Tray;
