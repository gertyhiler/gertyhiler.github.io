# Premium Animation — Reference

## Timing Reference

| Effect           | Duration    | Ease                 | Notes                              |
| ---------------- | ----------- | -------------------- | ---------------------------------- |
| Overlay 1 (wipe) | 0.5s        | power3.inOut         | Always the faster one              |
| Overlay 2 (wipe) | 0.4s        | power2.inOut         | Starts 180ms before overlay 1 ends |
| Single wipe      | 0.55s       | power3.inOut         |                                    |
| Hero text lines  | 1.1s        | power4.out           | Stagger 0.1s between lines         |
| Count-up         | 1.6s        | power2.out / easeOut | Starts with overlay animation      |
| Parallax         | scrub-based | none / linear        | Never use duration                 |
| Cursor ring lerp | lerp 0.1    | —                    | Applied per frame in ticker        |

## Scroll Trigger Start Points

| Content type        | `start` value |
| ------------------- | ------------- |
| Text blocks         | `top 83%`     |
| Large headings (H1) | `top 78%`     |
| Image cards         | `top 88%`     |
| Stats / numbers     | `top 83%`     |
| Full-width sections | `top 70%`     |

Lower % = triggers earlier (element travels further into viewport).

## Color Role Convention

```css
:root {
  --rev-primary: /* darkest / most contrasting */;
  --rev-secondary: /* mid-tone, neutral */;
}
```

- **Light backgrounds:** primary = dark gray/black, secondary = light gray
- **Dark backgrounds:** primary = white, secondary = mid-gray or accent
- **Colored backgrounds:** primary = white, secondary = transparent or lighter shade

Secondary overlay is barely noticeable — timing accent only.

## Common Mistakes to Avoid

| Mistake                                     | Why it fails                          | Fix                                               |
| ------------------------------------------- | ------------------------------------- | ------------------------------------------------- |
| `opacity: 0` on content, fade in at end     | Visible "pop" when opacity changes    | Content stays visible; overlays cover via z-index |
| Count-up starts after overlay finishes      | Numbers appear statically             | Start count-up at `position: 0` in timeline       |
| Random reveal directions per section        | Feels inconsistent                    | Pick one or two directions system-wide            |
| Parallax without extra height on inner      | Shows background at scroll extremes   | Use `inset: -15% 0` or `padding: 20% 0` on inner  |
| Mixing Lenis with `scroll-behavior: smooth` | Conflicts, janky behavior             | Remove native smooth scroll; Lenis only           |
| Duration > 1s for reveals                   | Feels slow, user scrolls past         | Keep total reveal under 0.9s                      |
| `scrub: true` for wipe reveals              | Reveals don't complete on fast scroll | Use `toggleActions: 'play none none none'`        |
| `scrub` with duration for parallax          | Feels sticky, has inertia             | Use `scrub: true` with no duration                |

## Pre-Ship Checklist

- [ ] Lenis initialized once, connected to ScrollTrigger if using GSAP
- [ ] All `overflow: hidden` on `.reveal` wrappers
- [ ] Content `z-index: 1`, overlays `z-index: 2+` — no opacity tricks
- [ ] Count-up elements have `data-count` and `data-suffix` attributes
- [ ] Parallax inner elements taller than container (`inset: -15% 0`)
- [ ] Hero entrance plays on load (`delay: 0.15–0.2`), not on scroll
- [ ] Custom cursor hidden on touch devices (`pointer: coarse`)
- [ ] No `scroll-behavior: smooth` in CSS if Lenis is active
- [ ] Reveal direction consistent across the page
- [ ] All timings verified on real scroll
