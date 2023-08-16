import { Typography } from "@mui/material";

function CopyrightText() {
  const currentYear = new Date().getFullYear();
  return (
    <Typography mt={2} variant="caption" color="text.secondary">
      © {currentYear} NXU Inc.
    </Typography>
  );
}

export default CopyrightText;