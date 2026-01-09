import { moderateScale } from '@/lib/responsive-dimensions';

export const createTypography = () => ({
  labelSmall: {
    fontSize: moderateScale(11),
    lineHeight: moderateScale(16),
    fontWeight: '500',
    letterSpacing: moderateScale(0.5),
  },
  labelSmallEmphasized: {
    fontSize: moderateScale(11),
    lineHeight: moderateScale(16),
    fontWeight: '600',
    letterSpacing: moderateScale(0.5),
  },
  label: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontWeight: '500',
    letterSpacing: moderateScale(0.5),
  },
  labelEmphasized: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontWeight: '600',
    letterSpacing: moderateScale(0.5),
  },
  labelLarge: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '500',
    letterSpacing: moderateScale(0.1),
  },
  labelLargeEmphasized: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '600',
    letterSpacing: moderateScale(0.1),
  },
  bodyLarge: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    fontWeight: '400',
    letterSpacing: moderateScale(0.5),
  },
  bodyLargeEmphasized: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    fontWeight: '500',
    letterSpacing: moderateScale(0.5),
  },
  bodyEmphasized: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '500',
    letterSpacing: moderateScale(0.25),
  },
  body: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    letterSpacing: moderateScale(0.25),
  },
  bodySmall: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontWeight: '400',
    letterSpacing: moderateScale(0.4),
  },
  bodySmallEmphasized: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontWeight: '500',
    letterSpacing: moderateScale(0.4),
  },
  titleLarge: {
    fontSize: moderateScale(22),
    lineHeight: moderateScale(28),
    fontWeight: '400',
    letterSpacing: moderateScale(0),
  },
  titleLargeEmphasized: {
    fontSize: moderateScale(22),
    lineHeight: moderateScale(28),
    fontWeight: '500',
    letterSpacing: moderateScale(0),
  },
  title: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    fontWeight: '500',
    letterSpacing: moderateScale(0.15),
  },
  titleEmphasized: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    fontWeight: '600',
    letterSpacing: moderateScale(0.15),
  },
  titleSmall: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '500',
    letterSpacing: moderateScale(0.1),
  },
  titleSmallEmphasized: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '600',
    letterSpacing: moderateScale(0.1),
  },
  headlineLarge: {
    fontSize: moderateScale(32),
    lineHeight: moderateScale(40),
    fontWeight: '400',
    letterSpacing: moderateScale(0),
  },
  headlineLargeEmphasized: {
    fontSize: moderateScale(32),
    lineHeight: moderateScale(40),
    fontWeight: '500',
    letterSpacing: moderateScale(0),
  },
  headline: {
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
    fontWeight: '400',
    letterSpacing: moderateScale(0),
  },
  headlineEmphasized: {
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
    fontWeight: '500',
    letterSpacing: moderateScale(0),
  },
  headlineSmall: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(32),
    fontWeight: '400',
    letterSpacing: moderateScale(0),
  },
  headlineSmallEmphasized: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(32),
    fontWeight: '500',
    letterSpacing: moderateScale(0),
  },
  large: {
    fontSize: moderateScale(36),
    lineHeight: moderateScale(40),
    fontWeight: '700',
    letterSpacing: moderateScale(0),
  },
  boldHighlightText: {
    fontSize: moderateScale(32),
    lineHeight: moderateScale(40),
    fontWeight: '700',
    letterSpacing: moderateScale(0),
  },
});

export const TYPOGRAPHY = createTypography();

export type TypographyVariant = keyof ReturnType<typeof createTypography>;
