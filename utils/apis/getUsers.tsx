import { User } from "@/types/user"

export async function getUsers(): Promise<User[]> {
    return [
        {
          "ID": 11111,
          "User": "Sam Marshall",
          "Check_Digit": 55
        },
        {
          "ID": 22222,
          "User": "Matt Lovell",
          "Check_Digit": 44
        },
        {
          "ID": 33333,
          "User": "Dave Eichler",
          "Check_Digit": 33
        },
        {
          "ID": 44444,
          "User": "Jake Thompson",
          "Check_Digit": 22
        },
        {
          "ID": 55555,
          "User": "Brandon Stanley",
          "Check_Digit": 11
        }
      ]
};