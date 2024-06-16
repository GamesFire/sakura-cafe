import { Location } from "react-router-dom";

export const getActiveNavLinkClass = (
  location: Location,
  path: string
): string => (location.pathname.includes(path) ? "link active" : "link");
