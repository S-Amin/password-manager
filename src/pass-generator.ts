import { sha256 } from "js-sha256";
interface PassConfig {
  name: string;
  usage: string;
  length?: number;
}
export function passGenerator(
  secretKey: string,
  passConfig: PassConfig,
  variant: number
) {
  const PASS_LENGTH = 17;
  const passLength = passConfig.length || PASS_LENGTH;

  const userCombo = `${secretKey}${passConfig.name}${passConfig.usage}${variant}`;
  const longPass = generateHashPass(userCombo);
  const generatedPassword = findSuitablePass(longPass, passLength);
  console.log({ generatedPassword });
  return generatedPassword;
}

function generateHashPass(userCombo: string) {
  const charList = [...PASS_CHARS];

  const hash = sha256.create();
  hash.update(userCombo);
  const longPass = hash
    .array()
    .map((n) => getPassChar(n, charList))
    .join("");

  console.log({ hash: hash.hex(), longPass });
  return longPass;
}

function getPassChar(number: number, charList: string[]) {
  const base = charList.length;
  const p0 = number % base;
  const p1 = Math.floor(number / base);
  const char0 = charList[p0];
  const char1 = charList[p1];

  /*-- remove repetition --*/
  if (p0 === p1) {
    charList.splice(p0, 1);
  } else if (p0 > p1) {
    charList.splice(p0, 1);
    charList.splice(p1, 1);
  } else {
    charList.splice(p1, 1);
    charList.splice(p0, 1);
  }

  return `${char1}${char0}`;
}

interface BoundaryChars {
  lc?: number; // Lower case character
  up?: number; // Upper case character
  dg?: number; // Digit character
  sp?: number; // Special character
}
function findSuitablePass(longPass: string, passLength: number) {
  const lcCharRgx = /[a-z]/;
  const ucCharRgx = /[A-Z]/;
  const digitCharRgx = /\d/;

  const logPassArr = longPass.split("");
  const boundaryChar: BoundaryChars = {
    lc: undefined,
    up: undefined,
    dg: undefined,
    sp: undefined,
  };

  for (const i in logPassArr) {
    const cc = logPassArr[i];
    switch (true) {
      case !!cc.match(lcCharRgx):
        boundaryChar.lc = +i;
        break;
      case !!cc.match(ucCharRgx):
        boundaryChar.up = +i;
        break;
      case !!cc.match(digitCharRgx):
        boundaryChar.dg = +i;
        break;
      default:
        boundaryChar.sp = +i;
        break;
    }
    const index = getIndexOfPassingRequirement(boundaryChar, passLength);

    if (index) {
      return longPass.substring(index - passLength + 1, index + 1);
    }
  }
  return null;
}

function getIndexOfPassingRequirement(
  boundaryChar: BoundaryChars,
  passLength: number
) {
  const lc = boundaryChar.lc;
  const up = boundaryChar.up;
  const dg = boundaryChar.dg;
  const sp = boundaryChar.sp;
  if (!lc || !up || !dg || !sp) {
    return false;
  }
  const lowest = Math.min(lc, up, dg, sp);
  const highest = Math.max(lc, up, dg, sp);
  if (highest - lowest < passLength) {
    return highest < passLength ? passLength - 1 : highest;
  } else return false;
}

const PASS_CHARS = [
  "!",
  //   '"',
  "#",
  "$",
  "%",
  "&",
  //   "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "[",
  //   "\\",
  "]",
  "^",
  "_",
  //   "`",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "{",
  "|",
  "}",
  "~",
];
