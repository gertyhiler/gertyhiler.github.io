---
name: premium-animation
description: >
  Implements premium-quality scroll animations, reveal effects, parallax, count-up numbers,
  and smooth cursor interactions using Motion (framer-motion) + Lenis for React/Next.js projects,
  or GSAP + ScrollTrigger + Lenis for vanilla JS/HTML projects.

  Use when the user asks for scroll animations, reveal effects, wipe transitions, content appearing
  on scroll, parallax images, animated counters, smooth scrolling, custom cursor, or premium/luxury
  feel. Also use when mentioning Lenis, Motion, GSAP, ScrollTrigger, or polished/agency-quality sites.
---

# Premium Animation System

Battle-tested patterns for premium, intentional, alive-feeling websites.
Stacks: **Motion + Lenis** (React/Next.js) and **GSAP + ScrollTrigger + Lenis** (vanilla).

---

## Core Philosophy

**Premium = timing, direction, restraint — not quantity.**

1. **Content is always visible — overlays reveal it.** Never `opacity: 0` and fade in. A colored rectangle sits on top and slides away. Content was always there.
2. **Timings are fast.** Reveal: 0.5–0.9s. Parallax: scrub-based. Count-up: 1.2–1.6s.
3. **Easing is asymmetric.** Entrance: `power3.inOut`. Exit/scrub: `none` or `linear`.
4. **One system, consistent everywhere.** Same wipe colors, timing, direction convention.
5. **Numbers count up from zero on reveal — always.**
6. **Lenis owns scroll — nothing else.** No `scroll-behavior: smooth`, native scroll snap, or mixed controllers.

---

## Stack Setup

### Lenis (shared)

```js
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

**With GSAP ScrollTrigger:**

```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

**With Motion (React):** use `@studio-freight/react-lenis` or wrap manually.

---

## Pattern 1 — Wipe Reveal

Colored rectangle on top of content slides away on scroll. Content is **always rendered**; overlay covers it.

### GSAP

```html
<div class="reveal" data-dir="left">
  <span class="rev-1"></span>
  <span class="rev-2"></span>
  <p class="reveal-inner">Content here</p>
</div>
```

```css
.reveal {
  position: relative;
  overflow: hidden;
}
.rev-1,
.rev-2 {
  position: absolute;
  inset: 0;
  will-change: transform;
  z-index: 2;
}
.rev-1 {
  background: var(--color-primary);
  z-index: 3;
}
.rev-2 {
  background: var(--color-neutral);
  z-index: 2;
}
.reveal-inner {
  position: relative;
  z-index: 1;
}
```

```js
document.querySelectorAll(".reveal").forEach((wrapper) => {
  const rev1 = wrapper.querySelector(".rev-1");
  const rev2 = wrapper.querySelector(".rev-2");
  const dir = wrapper.dataset.dir || "left";
  const isSingle = wrapper.hasAttribute("data-single");
  const isY = dir === "bottom" || dir === "top";
  const prop = isY ? "scaleY" : "scaleX";
  const origins = {
    left: ["left", "right"],
    right: ["right", "left"],
    bottom: ["bottom", "top"],
    top: ["top", "bottom"],
  };
  const [o1, o2] = origins[dir];
  gsap.set(rev1, { transformOrigin: o1 });
  gsap.set(rev2, { transformOrigin: isSingle ? o1 : o2 });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top 83%",
      toggleActions: "play none none none",
    },
  });
  if (isSingle) {
    tl.to(rev1, { [prop]: 0, duration: 0.55, ease: "power3.inOut" });
  } else {
    tl.to(rev1, { [prop]: 0, duration: 0.5, ease: "power3.inOut" }).to(
      rev2,
      { [prop]: 0, duration: 0.4, ease: "power2.inOut" },
      "-=0.18",
    );
  }
});
```

### Motion (React)

```tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const originMap = {
  left: { rev1: "0% 50%", rev2: "100% 50%" },
  right: { rev1: "100% 50%", rev2: "0% 50%" },
  bottom: { rev1: "50% 100%", rev2: "50% 0%" },
  top: { rev1: "50% 0%", rev2: "50% 100%" },
};

export function Reveal({ children, dir = "left", single = false, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-17% 0px" });
  const { rev1, rev2 } = originMap[dir];
  const isY = dir === "bottom" || dir === "top";
  const scaleKey = isY ? "scaleY" : "scaleX";

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          backgroundColor: "var(--color-primary)",
          transformOrigin: rev1,
          willChange: "transform",
        }}
        initial={{ [scaleKey]: 1 }}
        animate={inView ? { [scaleKey]: 0 } : { [scaleKey]: 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay }}
      />
      {!single && (
        <motion.span
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backgroundColor: "var(--color-neutral)",
            transformOrigin: rev2,
            willChange: "transform",
          }}
          initial={{ [scaleKey]: 1 }}
          animate={inView ? { [scaleKey]: 0 } : { [scaleKey]: 1 }}
          transition={{
            duration: 0.4,
            ease: [0.33, 1, 0.68, 1],
            delay: delay + 0.18,
          }}
        />
      )}
    </div>
  );
}
```

**Direction:** `left` (default), `right`, `bottom`, `top`. Single overlay: `data-single` or `single`.

---

## Pattern 2 — Count-Up Numbers

Count from 0 to target when reveal overlay begins. Finish roughly when overlay clears.

### GSAP (add to reveal timeline)

```js
const counter = wrapper.querySelector("[data-count]");
if (counter) {
  const target = +counter.dataset.count;
  const suffix = counter.dataset.suffix || "";
  const obj = { val: 0 };
  counter.textContent = "0" + suffix;
  tl.add(() => {
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      onUpdate() {
        counter.textContent = Math.round(obj.val) + suffix;
      },
    });
  }, 0);
}
```

### Motion (React)

```tsx
"use client";
import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "motion/react";

export function CountUp({ to, suffix = "", duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-17% 0px" });
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView && !started && ref.current) {
      setStarted(true);
      animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) ref.current.textContent = Math.round(value) + suffix;
        },
      });
    }
  }, [inView, started, to, suffix, duration]);
  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
```

Wrap in `<Reveal>` so count starts on reveal. Duration ≈ reveal + ~0.7s.

---

## Pattern 3 — Parallax Images

Inner element taller than container (`inset: -15% 0` or `-20% 0`) to avoid gaps.

### GSAP

```js
document.querySelectorAll("[data-parallax]").forEach((container) => {
  const inner = container.querySelector("[data-parallax-inner]");
  const speed = +(container.dataset.parallax || 0.2);
  gsap.to(inner, {
    y: `${-speed * 100}%`,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

### Motion (React)

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"],
});
const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);
```

**Speed:** 0.1 subtle, 0.2 standard, 0.3 hero, 0.4+ dramatic.

---

## Pattern 4 — Hero Text Entrance

Lines enter from below on load. Each line in overflow-hidden container.

### GSAP

```css
.hero-title .line {
  overflow: hidden;
  display: block;
}
.hero-title .line span {
  display: block;
  transform: translateY(110%);
}
```

```js
gsap.to(".hero-title .line span", {
  y: "0%",
  duration: 1.1,
  ease: "power4.out",
  stagger: 0.1,
  delay: 0.2,
});
```

### Motion (React)

```tsx
<motion.span
  initial={{ y: "110%" }}
  animate={{ y: "0%" }}
  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
/>
```

---

## Pattern 5 — Custom Cursor

Lerp-following dot + ring. Ring lags. Scale ring on hover over interactive elements.

```js
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
gsap.ticker.add(() => {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  gsap.set(dot, { x: mx, y: my });
  gsap.set(ring, { x: rx, y: ry });
});
document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
  el.addEventListener("mouseenter", () =>
    gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.3 }),
  );
  el.addEventListener("mouseleave", () =>
    gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 }),
  );
});
if (window.matchMedia("(pointer: coarse)").matches) {
  dot.style.display = ring.style.display = "none";
}
```

---

## Stagger for Multiple Elements

```js
// GSAP: delay: i * 0.1 in scrollTrigger
```

```tsx
// Motion: <Reveal delay={i * 0.1}>
```

Max stagger: 0.15s per item.

---

## Quick Reference

| Effect           | Duration | Ease         |
| ---------------- | -------- | ------------ |
| Overlay 1 (wipe) | 0.5s     | power3.inOut |
| Overlay 2 (wipe) | 0.4s     | power2.inOut |
| Single wipe      | 0.55s    | power3.inOut |
| Hero text        | 1.1s     | power4.out   |
| Count-up         | 1.6s     | power2.out   |
| Parallax         | scrub    | none         |

**ScrollTrigger start:** Text `top 83%`, H1 `top 78%`, images `top 88%`, full-width `top 70%`.

**Colors:** `--rev-primary` (darkest), `--rev-secondary` (neutral). Secondary overlay is timing accent only.

For timing details, common mistakes, and checklist, see [reference.md](reference.md).
