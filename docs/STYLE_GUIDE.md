# Style Guide

This project uses **CSS Modules** to keep component styles isolated.
Common variables are defined under `src/theme` and imported across modules.

## Rules
- Always create a `.module.css` file for new components.
- Use variables like `--radius-md` and `--radius-lg` for border radius.
- Buttons share base styles defined in `index.css`.
- Modals should use `Modal.jsx` as wrapper and apply custom classes.

### Icons
SVG files live under `src/assets` and are exported as React components from
`src/components/Icon`.
Use these components instead of `<img>` when adding icons:

```jsx
import { GoogleIcon } from '../components/Icon'

function Example() {
  return <GoogleIcon width={24} height={24} />
}
```

Future pull requests should follow these conventions.

### Design Tokens
The project exposes a set of CSS variables under `src/theme` to keep styles
consistent:

* **Colors** (`colors.css`)
  - `--hl-light`, `--hl-dark`
  - `--sys-text-light`, `--sys-text-dark`
  - `--sys-bg-light`, `--sys-bg-dark`
  - `--sys-border-light`, `--sys-border-dark`
  - `--sys-muted`, `--accent-color`, `--brand-color`

* **Spacing** (`spacing.css`)
  - `--space-1` – 4px
  - `--space-2` – 8px
  - `--space-3` – 16px
  - `--space-4` – 24px
  - `--space-5` – 32px

* **Radius** (`variables.css`)
  - `--radius-sm` – 4px
  - `--radius-md` – 8px
  - `--radius-lg` – 20px

* **Typography** (`typography.css`)
  - Font sizes: `--text-xs`, `--text-xs-2`, `--text-sm`, `--text-sm-plus`,
    `--text-base`, `--text-base-plus`, `--text-lg`, `--text-lg-plus`,
    `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-display`
  - Font weights: `--font-light`, `--font-normal`, `--font-medium`,
    `--font-semibold`, `--font-bold`

These tokens should be preferred over hard-coded values in component styles.
