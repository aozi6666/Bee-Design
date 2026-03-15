import type { CSSProperties } from 'react';
import type { ThemeProps } from '../Icon/icon.types';
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: CSSProperties;
    theme?: ThemeProps;
}
