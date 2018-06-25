import React = require('react')
import App from '../../../App'
import { Selector, Button } from '../..'
import * as s from './Sidebar.css'
import { AppState, Actions, DurationOption, ComparisonOption, RegionOption, StoreFormatOption, CustomerSegmentOption } from '../../../sharedTypes'
import { durationOptions, getDatesOptions, getComparisonOptions, categoryHierarchy, regionOptions, storeFormatOptions, customerSegmentOptions } from '../../../data'

interface Props {

    // Connecting the component
    appState: AppState
    actions: Actions
}

export class Sidebar extends React.Component<Props, {}> {
    render() {
        const {
            appState,
            actions,
        } = this.props

        const {
            selectedFilters,
            dataViewNeedsUpdating,
        } = appState

        // TYPE GUARDS
        if (typeof selectedFilters === 'undefined') { throw new Error() }

        return (
            <div
                className={s.Sidebar}
            >
                <div
                    className={s.title}
                >
                    Configure view
                </div>

                <div
                    className={s.selectorGroupContainer}
                >
                    <div
                        className={s.selectorGroupTitle}
                    >
                        Analysis period
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={durationOptions}
                            value={selectedFilters.duration}
                            handleSelectorChange={actions.changeSelected.duration}
                        />
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={getDatesOptions(selectedFilters.duration)}
                            value={selectedFilters.dates}
                            handleSelectorChange={actions.changeSelected.dates}
                        />
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={getComparisonOptions(selectedFilters.duration)}
                            value={selectedFilters.comparison}
                            handleSelectorChange={actions.changeSelected.comparison}
                        />
                    </div>
                </div>

                <div
                    className={s.selectorGroupContainer}
                >
                    <div
                        className={s.selectorGroupTitle}
                    >
                        Data source
                    </div>

                    <form
                        className={s.radiosAndLabels}
                    >
                        <input
                            type='radio'
                            id='dataSourceChoice1'
                            name='dataSource'
                            value='All data'
                            defaultChecked
                        />

                        <label
                            htmlFor='dataSourceChoice1'
                        >
                            All data
                        </label>

                        <input
                            type='radio'
                            id='dataSourceChoice2'
                            name='dataSource'
                            value='Loyalty Card'
                        />

                        <label
                            htmlFor='dataSourceChoice2'
                        >
                            Loyalty Card (LC)
                        </label>
                    </form>
                </div>

                <div
                    className={s.selectorGroupContainer}
                >
                    <div
                        className={s.selectorGroupTitle}
                    >
                        Data filters
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={Object.keys(categoryHierarchy['MEDICINE'])}
                            value={selectedFilters.subcategory}
                            handleSelectorChange={actions.changeSelected.subcategory}
                        />
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={regionOptions}
                            value={selectedFilters.region}
                            handleSelectorChange={actions.changeSelected.region}
                        />
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={storeFormatOptions}
                            value={selectedFilters.storeFormat}
                            handleSelectorChange={actions.changeSelected.storeFormat}
                        />
                    </div>

                    <div
                        className={s.selectorContainer}
                    >
                        <Selector
                            optionsArray={customerSegmentOptions}
                            value={selectedFilters.customerSegment}
                            handleSelectorChange={actions.changeSelected.customerSegment}
                        />
                    </div>
                </div>

                <Button
                    fullWidth
                    disabled={!dataViewNeedsUpdating}
                    handleButtonClick={actions.updateView}
                >
                    Update view
                </Button>
            </div>
        )
    }
}
