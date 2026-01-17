import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

import { useTheme } from '@/hooks';

interface ContentPlaceholderProps {
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

export const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({
  width = '100%',
  height,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${typeof width === 'number' ? width : 400} ${typeof height === 'number' ? height : 150}`}
      backgroundColor={theme.gray200}
      foregroundColor={theme.gray300}>
      {children}
    </ContentLoader>
  );
};

export { Circle, Rect };
