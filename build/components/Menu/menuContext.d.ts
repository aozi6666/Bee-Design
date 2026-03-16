type MenuMode = 'horizontal' | 'vertical';
export interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: import("react").Context<IMenuContext>;
export {};
