import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { HEROES, dir } from "../data/heroes";
import { FIRST, REST, loadFonts, loadImages } from "../utils/preload";
import HeroSlide from "./HeroSlide";
import ProductsSlide, { PRODUCTS_MID, PRODUCT_IMAGES } from "./ProductsSlide";
import AboutSlide, { ABOUT_MID, ABOUT_IMAGES } from "./AboutSlide";
import ReviewsSlide, { REVIEWS_MID } from "./ReviewsSlide";
import Loader from "./Loader";

const LOCK_MS = 1700; // scroll ke baad itni der naya scroll ignore hoga
const MIN_LOADER_MS = 900; // loader ek dum se flash na ho

const PRODUCTS = HEROES.length; // panel 5
const ABOUT = HEROES.length + 1; // panel 6
const REVIEWS = HEROES.length + 2; // panel 7 (last, footer ke saath)
const PANELS = HEROES.length + 3;

// footer ke links kis panel par le jayen
const FOOTER_LINKS = [
  { label: "Home", to: 0 },
  { label: "Products", to: PRODUCTS },
  { label: "About", to: ABOUT },
  { label: "Offers", to: ABOUT },
  { label: "Contact", to: REVIEWS },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const indexRef = useRef(0);
  const lock = useRef(false);
  const productsRef = useRef(null); // products ka inner scroll
  const aboutRef = useRef(null); // about ka inner scroll
  const reviewsRef = useRef(null); // reviews + footer ka inner scroll
  const last = PANELS - 1;

  // smoothed mouse position (-0.5 → 0.5) for parallax
  const mx = useSpring(0, { stiffness: 40, damping: 18 });
  const my = useSpring(0, { stiffness: 40, damping: 18 });

  // preload: fonts + hero 1 images, phir baaki sab background me
  useEffect(() => {
    let alive = true;
    const start = Date.now();

    Promise.all([loadImages(FIRST, (p) => alive && setProgress(p)), loadFonts()]).then(() => {
      const wait = Math.max(0, MIN_LOADER_MS - (Date.now() - start));
      setTimeout(() => {
        if (!alive) return;
        setReady(true);
        loadImages([...REST, ...PRODUCT_IMAGES, ...ABOUT_IMAGES]);
      }, wait);
    });

    return () => {
      alive = false;
    };
  }, []);

  const go = useCallback(
    (to) => {
      if (lock.current || to < 0 || to > last || to === indexRef.current) return;
      lock.current = true;
      dir.v = to > indexRef.current ? 1 : -1; // render se pehle set hota hai
      indexRef.current = to;
      setIndex(to);
      setTimeout(() => {
        lock.current = false;
      }, LOCK_MS);
    },
    [last]
  );

  useEffect(() => {
    // current panel ka inner scroller (hero panels me nahi hota)
    const scrollerFor = (i) =>
      i === PRODUCTS
        ? productsRef.current
        : i === ABOUT
          ? aboutRef.current
          : i === REVIEWS
            ? reviewsRef.current
            : null;

    // kya inner scroll upar/neeche ke edge par hai? (scroller na ho to true)
    const atEdge = (up) => {
      const el = scrollerFor(indexRef.current);
      if (!el) return true;
      return up ? el.scrollTop <= 2 : el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    };

    let lastWheel = 0;
    const onWheel = (e) => {
      const now = Date.now();
      const gap = now - lastWheel;
      lastWheel = now;
      // trackpad inertia (lagataar events) ko ignore karo
      if (Math.abs(e.deltaY) < 12 || gap < 90) return;

      const up = e.deltaY < 0;
      if (!atEdge(up)) return; // section ke andar abhi scroll baaki hai
      go(indexRef.current + (up ? -1 : 1));
    };

    let startY = 0;
    let startUp = true;
    let startDown = true;
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startUp = atEdge(true);
      startDown = atEdge(false);
    };
    const onTouchEnd = (e) => {
      const d = startY - e.changedTouches[0].clientY;
      if (Math.abs(d) < 50) return;
      const next = d > 0;
      const ok = next ? startDown && atEdge(false) : startUp && atEdge(true);
      if (!ok) return;
      go(indexRef.current + (next ? 1 : -1));
    };

    const onKey = (e) => {
      const el = scrollerFor(indexRef.current);

      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        if (el && !atEdge(false)) el.scrollBy({ top: 140, behavior: "smooth" });
        else go(indexRef.current + 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        if (el && !atEdge(true)) el.scrollBy({ top: -140, behavior: "smooth" });
        else go(indexRef.current - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  const onMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const hero = HEROES[index]; // products/about/reviews par undefined (use nahi hota)

  const bgColor =
    index === REVIEWS
      ? REVIEWS_MID
      : index === ABOUT
        ? ABOUT_MID
        : index === PRODUCTS
          ? PRODUCTS_MID
          : hero.mid;

  // dots sirf 4 hero sections ke liye
  const isHero = index < HEROES.length;
  const dots = HEROES.map((h) => ({ id: h.id, label: h.title.full }));

  return (
    <main
      onMouseMove={onMove}
      className="relative h-dvh w-screen overflow-hidden transition-colors duration-[1400ms] ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      {/* panels tabhi mount honge jab images + fonts ready hon */}
      {ready && (
        <AnimatePresence>
          {index === REVIEWS ? (
            <ReviewsSlide
              key="reviews"
              mx={mx}
              my={my}
              scrollRef={reviewsRef}
              links={FOOTER_LINKS}
              onGo={go}
            />
          ) : index === ABOUT ? (
            <AboutSlide key="about" mx={mx} my={my} scrollRef={aboutRef} />
          ) : index === PRODUCTS ? (
            <ProductsSlide key="products" mx={mx} my={my} scrollRef={productsRef} />
          ) : (
            <HeroSlide
              key={hero.id}
              hero={hero}
              index={index}
              total={PANELS}
              onPrev={() => go(indexRef.current - 1)}
              onNext={() => go(indexRef.current + 1)}
              mx={mx}
              my={my}
            />
          )}
        </AnimatePresence>
      )}

      {/* progress dots (sirf hero sections par) */}
      {ready && (
        <motion.div
          className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isHero ? 1 : 0, y: isHero ? 0 : 12 }}
          transition={{ delay: isHero ? 1.4 : 0, duration: 0.6 }}
          style={{ pointerEvents: isHero ? "auto" : "none" }}
        >
          {dots.map((d, i) => (
            <motion.button
              key={d.id}
              type="button"
              aria-label={`Go to ${d.label}`}
              onClick={() => go(i)}
              animate={{ width: i === index ? 28 : 10, opacity: i === index ? 1 : 0.55 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="h-2.5 cursor-pointer rounded-full bg-white"
            />
          ))}
        </motion.div>
      )}

      {/* loader: ready hote hi blur + fade ke saath hat jata hai */}
      <AnimatePresence>{!ready && <Loader key="loader" progress={progress} />}</AnimatePresence>
    </main>
  );
}