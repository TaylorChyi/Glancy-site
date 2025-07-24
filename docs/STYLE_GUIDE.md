# Style Guide

This project uses **CSS Modules** to keep component styles isolated.
Common variables are defined under `src/theme` and imported across modules.

## Rules
- Always create a `.module.css` file for new components.
- Use variables like `--radius-md` and `--radius-lg` for border radius.
- Buttons share base styles defined in `index.css`.
- Modals should use `Modal.jsx` as wrapper and apply custom classes.

Future pull requests should follow these conventions.
