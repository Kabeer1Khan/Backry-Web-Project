import { HEROES } from "../data/heroes";

const keep = []; // images ko memory me rakhta hai taaki dobara load na ho

export function loadImages(srcs, onProgress) {
  let done = 0;
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.src = src;
          keep.push(img);
          const finish = () => {
            done += 1;
            onProgress?.(done / srcs.length);
            resolve();
          };
          if (img.decode) img.decode().then(finish, finish);
          else {
            img.onload = finish;
            img.onerror = finish;
          }
        })
    )
  );
}

export function loadFonts() {
  if (!document.fonts) return Promise.resolve();
  return Promise.all([
    document.fonts.load('1em "Titan One"'),
    document.fonts.load('600 1em "Poppins"'),
    document.fonts.load('800 1em "Poppins"'),
  ]).catch(() => {});
}

const srcsOf = (h) => [h.bowl.src, ...h.floaters.map((f) => f.src)];

// hero 1 ki images (inka wait karna zaroori hai)
export const FIRST = [...new Set(srcsOf(HEROES[0]))];

// baaki heroes ki images (background me load hongi)
export const REST = [...new Set(HEROES.slice(1).flatMap(srcsOf))].filter(
  (s) => !FIRST.includes(s)
);