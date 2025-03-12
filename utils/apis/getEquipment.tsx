import { Equipment } from "@/types/equipment";

export async function getEquipment(User:number): Promise<Equipment[]> {
  switch (User) {
      case 11111: 
  
        return [
            {
              "ID": 11111,
              "Equipment": "Forklift",
            },
            {
              "ID": 22222,
              "Equipment": "Pallet Jack",
            },
            {
              "ID": 33333,
              "Equipment": "Scissor Lift",
            },
            {
              "ID": 44444,
              "Equipment": "Boom Lift",
            },
            {
              "ID": 55555,
              "Equipment": "RF Scanner",
            }
        ];
      case 22222:
        return [
          {
            "ID": 11111,
            "Equipment": "Forklift",
          },
          {
            "ID": 22222,
            "Equipment": "Pallet Jack",
          },
          {
            "ID": 55555,
            "Equipment": "RF Scanner",
          }
        ];
      case 33333:
        return [
          {
            "ID": 22222,
            "Equipment": "Pallet Jack",
          },
          {
            "ID": 55555,
            "Equipment": "RF Scanner",
          }
        ];
      case 44444:
        return [
          {
            "ID": 11111,
            "Equipment": "Forklift",
          },
          {
            "ID": 22222,
            "Equipment": "Pallet Jack",
          },
          {
            "ID": 33333,
            "Equipment": "Scissor Lift",
          },
          {
            "ID": 44444,
            "Equipment": "Boom Lift",
          },
          {
            "ID": 55555,
            "Equipment": "RF Scanner",
          }
        ];
      case 55555:
        return [
          {
            "ID": 22222,
            "Equipment": "Pallet Jack",
          },
          {
            "ID": 55555,
            "Equipment": "RF Scanner",
          }
        ];
      default:
        return [];
  }
};