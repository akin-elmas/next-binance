"use client";
import React, { useEffect, useState } from "react";
import LeftActions from "../LeftActions";
import AddStockModal from "../AddStockModal";
import { fetchCoins } from "@/lib/actions";
import { Coin } from "../../types/types";
import LeftSymbolList from "../LeftSymbolList";

export default function LeftArea() {
  const [open, setOpen] = useState<boolean>(false);
  const [coins, setCoins] = useState<Coin[]>([]);

  const refreshCoins = async () => {
    fetchCoins().then((data) => {
      setCoins(data);
    });
  };

  useEffect(() => {
    refreshCoins();

    const interval = setInterval(() => {
      refreshCoins();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <LeftActions setOpen={setOpen} open={open} onRefresh={refreshCoins} />
      <LeftSymbolList />
      <AddStockModal
        coins={coins}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </div>
  );
}
