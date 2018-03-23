import * as React from 'react'
import { FiltersSet } from '../../../sharedTypes'
import * as s from './CollapsibleContentModule.css'
import { CollapseButton } from '../..'
import classNames = require('classnames')

interface Props {
      title: string,
      children: React.ReactNode,
      expanded?: boolean,
      displayedFilters?: FiltersSet,
      handleCollapseButtonClick?: React.MouseEventHandler<HTMLElement>,
}

export class CollapsibleContentModule extends React.Component<Props, {}> {
      static defaultProps = {
            expanded: false,
            handleCollapseButtonClick: () => {console.log('handleCollapseButtonClick')},
      }

      render() {
            const {
                  title,
                  children,
                  expanded,
                  displayedFilters: {
                        duration,
                        dates,
                        comparison,
                        subcategory,
                        region,
                        storeFormat,
                        customerSegment,
                  },
                  handleCollapseButtonClick,
            } = this.props

            return (
                  <div
                        className={classNames(
                              s.CollapsibleContentModule,
                              {
                                    [s.expanded]: expanded,
                              }
                        )}
                  >

                        <div
                              className={s.collapseButtonContainer}
                        >
                              <CollapseButton 
                                    expanded={expanded}
                                    handleClick={handleCollapseButtonClick}
                              />
                              
                        </div>

                        <div
                              className={s.title}
                        >
                              {title}
                        </div>

                        {expanded &&
                              <div 
                                    className={s.subTitle}
                              >
                                    {`${duration} • ${dates} ${comparison}`}
                                    <br />
                                    {`${subcategory} • ${region} • ${storeFormat} • ${customerSegment}`}
                              </div>      
                        }

                        {expanded &&
                              <div
                                    className={s.childrenContainer}
                              >
                                    {children}
                              </div>
                        }

                  </div>
            )
      }
}