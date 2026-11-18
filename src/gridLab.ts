// A janela simulada usa uma raiz fixa para a régua medir pixels CSS.
export const gridLab = {
  rootPx: 16,
  columnRem: 14,
  gapRem: 1,
  prints: ["Diagonal", "Órbita", "Curva"],
};

export function minimumGridWidth(columns: number) {
  return (columns * gridLab.columnRem + (columns - 1) * gridLab.gapRem) * gridLab.rootPx;
}
