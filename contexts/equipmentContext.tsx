import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Equipment } from '@/types/equipment';

type EquipmentContextType = {
  equipment: Equipment | null;
  setEquipment: (equipment: Equipment | null) => void;
};

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);

  return (
    <EquipmentContext.Provider value={{ equipment, setEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};