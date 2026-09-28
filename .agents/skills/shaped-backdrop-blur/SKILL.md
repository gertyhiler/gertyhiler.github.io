---
name: shaped-backdrop-blur
description: Creates non-rectangular elements with backdrop-filter blur using mask-image instead of clip-path. Use when building shaped frosted-glass overlays, L-shaped cards with blur, or when the user mentions clip-path with backdrop-filter, shaped blur, mask-image blur, or frosted glass polygon.
---

# Shaped Backdrop Blur

## The Problem

`clip-path` and `backdrop-filter` on the **same element** — known browser bug.
`clip-path` creates an isolated stacking context; `backdrop-filter` inside that
context cannot sample content behind the element. Result: blur disappears or
leaks outside the clipped boundary.

**Does NOT work:**

```css
.card {
  backdrop-filter: blur(20px);
  clip-path: polygon(0 0, 65% 0, 65% 50%, 100% 50%, 100% 100%, 0 100%);
}
```

**Also does NOT work** — wrapper/pseudo-element with `clip-path` on parent,
`backdrop-filter` on child. The parent's `clip-path` still isolates the
stacking context, so the child's `backdrop-filter` sees nothing to blur.

## Solution: mask-image

Replace `clip-path` with `mask-image` / `-webkit-mask-image`.
Mask is applied **after** backdrop-filter compositing, so blur renders
correctly, then the mask cuts the shape.

### Step-by-step

1. **Define the shape as an SVG polygon** (coordinates in 0–100 range, `viewBox="0 0 100 100"`):

```svg
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 100 100"
     preserveAspectRatio="none">
  <polygon points="0,0 65,0 65,50 100,50 100,100 0,100" fill="white"/>
</svg>
```

2. **URL-encode the SVG** for inline `data:` URI (minimum encoding: `<` → `%3C`, `>` → `%3E`):

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolygon points='0,0 65,0 65,50 100,50 100,100 0,100' fill='white'/%3E%3C/svg%3E
```

3. **Apply to the element** alongside `backdrop-filter`:

```css
.card {
  background: rgba(136, 136, 136, 0.38);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);

  -webkit-mask-image: url("data:image/svg+xml,...");
  mask-image: url("data:image/svg+xml,...");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
```

### SVG Encoding Rules

| Char | Encoded | Required                |
| ---- | ------- | ----------------------- |
| `<`  | `%3C`   | Yes                     |
| `>`  | `%3E`   | Yes                     |
| `#`  | `%23`   | Yes                     |
| `'`  | as-is   | OK inside `url("...")`  |
| `"`  | `%22`   | If outer quotes are `"` |

Use single quotes inside the SVG, double quotes for CSS `url("...")`.

### Curved Shapes

For curves, use `<path>` with Bezier commands instead of `<polygon>`:

```svg
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 100 100"
     preserveAspectRatio="none">
  <path d="M0 0 L65 0 L65 28.3 C65 50 100 50 100 71.2 L100 100 L0 100 Z"
        fill="white"/>
</svg>
```

### Responsive Breakpoints

`mask-image` set in one breakpoint cascades to wider breakpoints.
Override `mask-image: none` to remove the shape on other breakpoints, or
set a different mask SVG per breakpoint.

```css
@media (min-width: 768px) {
  .card {
    -webkit-mask-image: url("data:image/svg+xml,...");
    mask-image: url("data:image/svg+xml,...");
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
}

/* Remove mask on mobile if not needed */
.card {
  -webkit-mask-image: none;
  mask-image: none;
}
```

## Checklist

- [ ] Use `mask-image`, never `clip-path`, on elements with `backdrop-filter`
- [ ] Always include both `-webkit-mask-image` and `mask-image`
- [ ] Always include both `-webkit-mask-size` and `mask-size` set to `100% 100%`
- [ ] SVG must have `preserveAspectRatio="none"` to stretch to element bounds
- [ ] SVG shape fill must be `white` (opaque = visible, transparent = hidden)
- [ ] Always include both `-webkit-backdrop-filter` and `backdrop-filter`

## Common Shapes Reference

**L-shape (notch top-right):**

```
points="0,0 W,0 W,H 100,H 100,100 0,100"
```

Where W = left column width %, H = step height %.

**L-shape (notch top-left):**

```
points="W,0 100,0 100,100 0,100 0,H W,H"
```

**L-shape (notch bottom-right):**

```
points="0,0 100,0 100,H W,H W,100 0,100"
```

**Rounded rectangle** (use `<rect rx="..." ry="...">` instead of polygon):

```svg
<rect width="100" height="100" rx="8" ry="8" fill="white"/>
```
