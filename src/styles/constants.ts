export const spacing: { [index: string]: number } = {
  ScreenPadding: 20,
};

export const calcNormalLineHeight = (fontSize: number): number =>
  Math.floor(fontSize * (146.667 / 100));
