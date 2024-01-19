import { Typography } from "@mui/material";
import { Props } from "./types";

function MenuItem({ text, Icon, url, color = "text-stone-900" }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="hover:bg-black/10 flex items-center p-2 cursor-default"
    >
      {<Icon className={`${color} mr-2`} fontSize="medium" />}
      <Typography className={color}>{text}</Typography>
    </a>
  );
}

export default MenuItem;
