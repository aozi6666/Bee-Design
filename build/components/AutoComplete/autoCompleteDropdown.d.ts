import type { FC, ReactElement } from 'react';
import type { DataSourceType } from './autoComplete.types';
export interface AutoCompleteDropdownProps {
    loading: boolean;
    showDropdown: boolean;
    suggestions: DataSourceType[];
    highlightIndex: number;
    onSelect: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
    onExited?: () => void;
}
export declare const AutoCompleteDropdown: FC<AutoCompleteDropdownProps>;
export default AutoCompleteDropdown;
