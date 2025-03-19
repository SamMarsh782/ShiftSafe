import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Warehouse } from '@/types/warehouse';

type WarehouseContextType = {
  warehouse: Warehouse | null;
  setWarehouse: (warehouse: Warehouse | null) => void;
};

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

export const WarehouseProvider = ({ children }: { children: ReactNode }) => {
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);

  return (
    <WarehouseContext.Provider value={{ warehouse, setWarehouse }}>
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouse = () => {
  const context = useContext(WarehouseContext);
  if (context === undefined) {
    throw new Error('useWarehouse must be used within a WarehouseProvider');
  }
  return context;
};