import type { FC, ReactElement } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import type { DataSourceType } from './autoComplete.types'

export interface AutoCompleteDropdownProps {
  loading: boolean
  showDropdown: boolean
  suggestions: DataSourceType[]
  highlightIndex: number
  onSelect: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
  onExited?: () => void
}

export const AutoCompleteDropdown: FC<AutoCompleteDropdownProps> = (props) => {
  const {
    loading,
    showDropdown,
    suggestions,
    highlightIndex,
    onSelect,
    renderOption,
    onExited,
  } = props

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  return (
    <Transition
      in={showDropdown || loading}
      animation="zoom-in-top"
      timeout={300}
      onExited={onExited}
    >
      <ul className="viking-suggestion-list">
        {loading && (
          <div className="suggstions-loading-icon">
            <Icon icon="spinner" spin />
          </div>
        )}
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex,
          })
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => onSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    </Transition>
  )
}

export default AutoCompleteDropdown
