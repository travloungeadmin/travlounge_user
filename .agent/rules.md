# Project Agent Instructions

These instructions define the coding standards and conventions for this project.

## Components

- **View/ThemedView**: Use `View` (from `react-native`) or `ThemedView` instead of `Box`, `Column`, or `Row`.
- **ThemedText**: Always use `ThemedText` instead of `Text` or `RNText`.

## Styling & Theming

- **Colors**: All colors must be sourced from the theme using `useTheme`. Do not hardcode hex values or use `Box` props for colors.
- **Spacing**: Use `SPACING` constants (from `@/newConstants/spacing`) instead of `Device` constants for dimensions and spacing.
- **Typography**: Text styles (fontSize, lineHeight, etc.) must be taken from `TYPOGRAPHY` newConstants. Do not hardcode font sizes or weights.
