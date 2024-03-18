import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Coin } from "@/types/types";

type ListProps = Pick<Coin, "symbol" | "lastPrice">;

export default function List(props: ListProps[]) {
  return (
    <div>
      {props.map((coin) => (
        <ListItem key={coin.symbol}>
          <ListItemText primary={coin.symbol} secondary={coin.lastPrice} />
          <IconButton aria-label="delete">Delete</IconButton>
        </ListItem>
      ))}
    </div>
  );
}
