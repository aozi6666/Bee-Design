import type { FC, ReactElement } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import type { DataSourceType } from './autoComplete.types'

export interface SuggestionListProps {
  loading: boolean
  show: boolean
  suggestions: DataSourceType[]
  highlightIndex: number
  onSelect: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
  onExited: () => void
}

export const SuggestionList: FC<SuggestionListProps> = ({
  loading,
  show,
  suggestions,
  highlightIndex,
  onSelect,
  renderOption,
  onExited,
}) => {
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  return (
    <Transition
      in={show || loading}
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
            <li key={index} className={cnames} onClick={() => onSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    </Transition>
  )
}

