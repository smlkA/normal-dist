import React from "react";
import Typography from "@material-ui/core/Typography";

const Header = ({ title }) => {
  return (
    <Typography variant="h2" align="left">
      {title}
    </Typography>
  );
};

export default Header;
