import { Avatar, Typography } from "@mui/material";
import { Props } from "./types";

function Role({ name, what, picture }: Props) {
  return (
    <div className="flex bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
      <Avatar alt={name} src={picture} sx={{ width: 70, height: 70 }} />
      <div className="self-center ml-2">
        <Typography className="text-gray-200">{name}</Typography>
        <Typography className="text-gray-200" variant="body2">
          {what}
        </Typography>
      </div>
    </div>
  );
}

export default Role;
