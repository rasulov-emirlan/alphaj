import { Word } from "./logic";

export const words = new Map<string[], Word>([
  [["go", "ha", "n"], new Word("ごはん", "ライス", "ご飯")],
  [["ri", "n", "go"], new Word("りんご", "リンゴ", "林檎")],
  [["ha", "ha"], new Word("はは", "ママ", "母")],
]);
