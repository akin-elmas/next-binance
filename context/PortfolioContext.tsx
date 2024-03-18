"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Asset {
  symbol: string;
  quantity: number;
}

interface PortfolioContextType {
  portfolio: Asset[];
  addOrUpdateAsset: (symbol: string, quantity: number) => void;
  removeAsset: (symbol: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const PORTFOLIO_STORAGE_KEY = "userPortfolio";

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, setPortfolio] = useState<Asset[]>(() => {
    if (typeof window === "undefined") return [];

    const storedPortfolio = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    return storedPortfolio ? JSON.parse(storedPortfolio) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    }
  }, [portfolio]);

  const addOrUpdateAsset = (symbol: string, quantity: number) => {
    setPortfolio((current) => {
      const index = current.findIndex((asset) => asset.symbol === symbol);
      if (index >= 0) {
        const newPortfolio = [...current];
        newPortfolio[index] = { ...newPortfolio[index], quantity: quantity }; // Miktarı yeni değerle güncelle
        return newPortfolio;
      } else {
        return [...current, { symbol, quantity }];
      }
    });
  };

  const removeAsset = (symbol: string) => {
    setPortfolio((current) =>
      current.filter((asset) => asset.symbol !== symbol)
    );
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, addOrUpdateAsset, removeAsset }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
