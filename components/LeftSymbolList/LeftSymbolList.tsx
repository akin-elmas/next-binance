import React, { useState } from "react";
import { Button, Box, TextField, Stack } from "@mui/material";
import { usePortfolio } from "../../context/PortfolioContext";

interface SelectedQuantities {
  [key: string]: number;
}

export default function LeftSymbolList() {
  const { portfolio, addOrUpdateAsset, removeAsset } = usePortfolio();
  const [selectedQuantities, setSelectedQuantities] =
    useState<SelectedQuantities>({});

  const handleQuantityChange = (symbol: string, quantity: number) => {
    setSelectedQuantities({ ...selectedQuantities, [symbol]: quantity });
  };

  return (
    <Stack alignItems="start" gap={3} pt={10}>
      {portfolio.map((asset) => (
        <Stack key={asset.symbol}>
          <div>{asset.symbol}</div>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              size="small"
              type="number"
              value={selectedQuantities[asset.symbol] || asset.quantity}
              onChange={(e) =>
                handleQuantityChange(asset.symbol, Number(e.target.value))
              }
              variant="outlined"
            />
            <Button
              onClick={() =>
                addOrUpdateAsset(
                  asset.symbol,
                  Number(selectedQuantities[asset.symbol] || asset.quantity)
                )
              }
            >
              Update
            </Button>
            <Button onClick={() => removeAsset(asset.symbol)}>Remove</Button>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
