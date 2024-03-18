import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { usePortfolio } from "../../context/PortfolioContext";
import { Coin } from "../../types/types";
import { debounce } from "lodash";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddStockModalProps {
  open: boolean;
  handleClose: () => void;
  coins: Coin[];
}

export default function AddStockModal({
  open,
  handleClose,
  coins,
}: AddStockModalProps) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const { portfolio, addOrUpdateAsset, removeAsset } = usePortfolio();

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setSearchTerm(searchInput);
    }, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput]);

  const filteredCoins = coins.filter((coin) =>
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (quantity && symbol) {
      addOrUpdateAsset(symbol.toUpperCase(), Number(quantity));
      setSymbol("");
      setSearchInput("");
      setQuantity("");
      handleClose();
    }
  };

  const assetInPortfolio = portfolio.find(
    (asset) => asset.symbol === symbol.toUpperCase()
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-stock-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography id="add-stock-modal-title" variant="h6" component="h2">
          Add or Update Stock in Portfolio
        </Typography>

        <TextField
          margin="normal"
          fullWidth
          label="Search Stock Symbol"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoFocus
        />
        <List sx={{ maxHeight: 200, overflow: "auto", my: 2 }}>
          {filteredCoins.map((coin) => (
            <ListItem
              key={coin.symbol}
              onClick={() => {
                setSymbol(coin.symbol);
                setSearchInput(coin.symbol);
                setSearchTerm("");
              }}
            >
              <ListItemText primary={coin.symbol} />
            </ListItem>
          ))}
        </List>

        {symbol && (
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {assetInPortfolio ? "Update" : "Add"}
            </Button>
            {assetInPortfolio && (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => {
                  removeAsset(symbol.toUpperCase());
                  handleClose();
                }}
              >
                Remove
              </Button>
            )}
          </form>
        )}
      </Box>
    </Modal>
  );
}
