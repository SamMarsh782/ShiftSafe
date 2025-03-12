import { Question } from "@/types/question";
import { Switch } from "react-native-gesture-handler";

export async function getQuestions(equip: number): Promise<Question[]> {
  switch (equip) {
    case 11111:
      return [
        { ID: 12345, Equipment: 11111, Question: "Are the forks good?" },
        { ID: 23456, Equipment: 11111, Question: "Do the lights work?" },
        { ID: 34567, Equipment: 11111, Question: "Are all of the labels and warnings attached in all of the locations that the labels need to be attached?" }
      ];
    case 22222:
      return [
        { ID: 45678, Equipment: 22222, Question: "Are the forks good?" },
        { ID: 56789, Equipment: 22222, Question: "Are the wheels good?" },
        { ID: 67890, Equipment: 22222, Question: "Does steering work?" },
        { ID: 78901, Equipment: 22222, Question: "Is the item in good working condition?" }
      ];
    case 33333:
      return [
        { ID: 89012, Equipment: 33333, Question: "Filler question" }
      ];
    case 44444:
      return [
        { ID: 90123, Equipment: 44444, Question: "Filler question" }
      ];
    case 55555:
      return [
        { ID: 99999, Equipment: 55555, Question: "Filler question" }
      ];
    default:
      return [];
  }
}