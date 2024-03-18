import { Button, Stack } from "@mui/material";

interface LeftActionsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRefresh: () => void;
}

export default function LeftActions({
  open,
  setOpen,
  onRefresh,
}: LeftActionsProps) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(!open)}
      >
        {open ? "Add / Update" : "Add Stock"}
      </Button>
      <Button variant="contained" color="primary" onClick={onRefresh}>
        Refresh
      </Button>
    </Stack>
  );
}
