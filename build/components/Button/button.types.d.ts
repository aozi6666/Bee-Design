import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
export declare const ButtonSize: {
    readonly Large: "lg";
    readonly Small: "sm";
};
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
export declare const ButtonType: {
    readonly Primary: "primary";
    readonly Default: "default";
    readonly Danger: "danger";
    readonly Link: "link";
};
export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];
export interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: ReactNode;
    href?: string;
}
export type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
