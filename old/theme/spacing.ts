/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  padding: 16,
  gap: 16,
} as const;

export type Spacing = keyof typeof spacing;
