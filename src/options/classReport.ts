/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortClassOptions = (options: any[]) => {
  const order = [
    "Pre_one",
    "One",
    "Two",
    "Three",
    "Four_boys",
    "Four_girls",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nurani",
    "Nazera",
    "Hifz",
    "Sunani",
  ];

  return [...options].sort((a, b) => {
    const indexA = order.indexOf(a.label);
    const indexB = order.indexOf(b.label);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

// const sortClassOptions = (options: any[]) => {
//   const order = [
//     "Pre_one",
//     "One",
//     "Two",
//     "Three",
//     "Four_boys",
//     "Four_girls",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nurani",
//     "Nazera",
//     "Hifz",
//     "Sunani",
//   ];

//   return [...options].sort((a, b) => {
//     const labelA = a.label || a;
//     const labelB = b.label || b;
//     const indexA = order.indexOf(labelA);
//     const indexB = order.indexOf(labelB);
//     // If a label is not in the order array, put it at the end
//     if (indexA === -1) return 1;
//     if (indexB === -1) return -1;
//     return indexA - indexB;
//   });
// };
