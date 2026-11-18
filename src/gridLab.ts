// A raiz da janela simulada é fixa para a régua medir pixels CSS.
export const ROOT_FONT_SIZE_PX = 16;
export const MIN_CARD_REM = 14;
export const GRID_GAP_REM = 1;
export const prints = ["Diagonal", "Órbita", "Curva"] as const;

export function getMinWidthForColumnsPx(columns: number): number {
  if (columns <= 1) return MIN_CARD_REM * ROOT_FONT_SIZE_PX;
  const totalRem = columns * MIN_CARD_REM + (columns - 1) * GRID_GAP_REM;
  return totalRem * ROOT_FONT_SIZE_PX;
}

export function getActiveColumns(containerWidthPx: number): number {
  const minCardPx = MIN_CARD_REM * ROOT_FONT_SIZE_PX;
  const gapPx = GRID_GAP_REM * ROOT_FONT_SIZE_PX;
  return Math.max(1, Math.floor((containerWidthPx + gapPx) / (minCardPx + gapPx)));
}
