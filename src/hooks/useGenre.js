export const useGenre = (g) => {
  if (g.length < 1) return "";

  const numGeneres = g.map((item) => item.id);
  return numGeneres.reduce((a, c) => a + "," + c);
};
