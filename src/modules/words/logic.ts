import { AlphabetHiragana, AlphabetKatakana } from "./alphabets";

export type AlphabetType = "hiragana" | "katakana" | "kanji";

export class Word {
  hiragana: string;
  katakana: string;
  kanji: string;

  constructor(
    hiragana: string = "",
    katakana: string = "",
    kanji: string = ""
  ) {
    this.hiragana = hiragana;
    this.katakana = katakana;
    this.kanji = kanji;
  }

  check(input: string, alphabet: AlphabetType): boolean {
    if (this[alphabet].length === 0) {
      throw new Error(`No ${alphabet} provided for this word`);
    }

    return this[alphabet] === input;
  }

  getAnswers(): string[] {
    return [this.hiragana, this.katakana, this.kanji];
  }
}

interface IAnswer {
  hiragana?: string;
  katakana?: string;
  kanji?: string;
  isCorrect: boolean;
}

export class WordsLogic {
  // key is a japanese word with english pronunciation
  words: Map<string[], Word>;
  tries: number;
  maxTries: number;

  constructor(
    words: Map<string[], Word>,
    maxTries: number = 10,
    tries: number = 0
  ) {
    if (words.size === 0) {
      throw new Error("Cannot create a WordsLogic instance with no words");
    }
    if (maxTries < 1) {
      throw new Error("Cannot create a WordsLogic instance with maxTries < 1");
    }
    if (tries < 0) {
      throw new Error("Cannot create a WordsLogic instance with tries < 0");
    }
    if (tries > maxTries) {
      throw new Error(
        "Cannot create a WordsLogic instance with tries > maxTries"
      );
    }

    this.maxTries = maxTries;
    this.tries = tries;
    this.words = words;
  }

  getWord(): string[] {
    const words = Array.from(this.words.keys());
    const word = words[Math.floor(Math.random() * words.length)];

    if (!word) {
      throw new Error("Cannot get a word from an empty list");
    }

    return word;
  }

  checkAnswer(word: string[], input: string, alphabet: AlphabetType): IAnswer {
    this.checkAlphabet(alphabet, input);

    if (this.tries >= this.maxTries) {
      throw new Error("Number of tries exceeded");
    }

    this.tries++;
    const currWord = this.words.get(word);

    // if this is the last try, return the correct answers
    if (this.tries === this.maxTries) {
      return {
        isCorrect: currWord?.check(input, alphabet) ?? false,
        ...currWord?.getAnswers(),
      };
    }

    // otherwise, return result of users input
    return { isCorrect: currWord?.check(input, alphabet) ?? false };
  }

  private checkAlphabet(alphabet: AlphabetType, input: string) {
    switch (alphabet) {
      case "hiragana":
        // if (!AlphabetHiragana.includes(input)) {
        //   throw new Error(`Invalid hiragana: ${input}`);
        // }
        break;
      case "katakana":
        // if (!AlphabetKatakana.includes(input)) {
        //   throw new Error(`Invalid katakana: ${input}`);
        // }
        break;
      case "kanji":
        throw new Error("Kanji is not supported yet😥");
      default:
        throw new Error(`Unknown alphabet: ${alphabet}`);
    }
  }
}
