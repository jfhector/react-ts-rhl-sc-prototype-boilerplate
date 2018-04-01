import * as React from 'react'
import { hot } from 'react-hot-loader'
import {
      Button,
      Alert,
      CollapseButton,
      Selector,
      CollapsibleContentModule,
      KpiTile,
      CollapsibleContentBoard,
      Sidebar,
      DataViewComponent,
} from './components/'
import * as s from './App.css'
import { MeasureName, FiltersSet, DateOption, ComparisonOption, MedicineSubcategoryName, RegionOption, StoreFormatOption, CustomerSegmentOption, DurationOption } from './sharedTypes'
import { getComparisonOptions } from './data'

const PROTOIMG_nav_header = require('./assets/PROTOIMG_nav_header.png')
const PROTOIMG_nav_tabs = require('./assets/PROTOIMG_nav_tabs.png')
const PROTOIMG_nav_footer = require('./assets/PROTOIMG_nav_footer.png')

interface Props {}

export interface AppState {
     
      // FILTERS SELECTION AND RELATED VIEW-LOGIC
      selectedFilters?: FiltersSet,
      displayedFilters?: FiltersSet,
      dataViewNeedsUpdating?: boolean,

      // SELECTED MEASURE 
      selectedMeasure?: MeasureName,

      // DEFINES WHICH CONTENT BOARDS ARE EXPANDED
      measuresSummaryExpanded?: boolean,
      measuresInDetailExpanded?: boolean,
      KPITreesExpanded?: boolean,

      // DEFINES WHICH CONTENT MODULES ARE EXPANDED
      trendGraphExpanded?: boolean,
      splitBySubcategoriesExpanded?: boolean,
      splitByStoreFormatsExpanded?: boolean,
      splitByCustomerSegmentsExpanded?: boolean,
      splitByRegionsExpanded?: boolean,
      
      // MEASURE SELECTOR VISIBLE
      measureSelectorContainerVisible?: boolean,
}

const initialState: AppState = {
      selectedFilters: {
            duration: '4 weeks',
            dates: '25 Dec 2017 - 21 Jan 2018',
            comparison: 'vs. previous 4 weeks',
            subcategory: 'All product groups',
            storeFormat: 'All store formats',
            customerSegment: 'All customer segments',
            region: 'All regions',
      },
      displayedFilters: {
            duration: '4 weeks',
            dates: '25 Dec 2017 - 21 Jan 2018',
            comparison: 'vs. previous 4 weeks',
            subcategory: 'All product groups',
            storeFormat: 'All store formats',
            customerSegment: 'All customer segments',
            region: 'All regions'
      },
      dataViewNeedsUpdating: false,

      selectedMeasure: 'Sales value',

      measuresSummaryExpanded: true,
      measuresInDetailExpanded: true,
      KPITreesExpanded: false,

      trendGraphExpanded: false,
      splitBySubcategoriesExpanded: false,
      splitByStoreFormatsExpanded: false,
      splitByCustomerSegmentsExpanded: false,
      splitByRegionsExpanded: false,
      
      measureSelectorContainerVisible: false,
}

class App extends React.Component<Props, AppState> {
      setAppState: typeof App.prototype.setState
      refToDataViewComponent: DataViewComponent

      // constructor(props: Props) {
      //       super(props)
      //       this.state = initialState

      //       this.setAppState = this.setState.bind(this)
      // }

      state = initialState

      actions = {
            updateView: () => {
                  this.setState(
                        (prevState: AppState) => ({
                              displayedFilters: prevState.selectedFilters,
                              dataViewNeedsUpdating: false,
                        })
                  )
            },
            changeSelectedDuration: (newlySelectedDuration: DurationOption) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    duration: newlySelectedDuration,
                                    comparison: getComparisonOptions(newlySelectedDuration)[0]
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
            changeSelectedDates: (newlySelectedDates: DateOption) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    dates: newlySelectedDates
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
            changeSelectedComparison: (newlySelectedComparison: ComparisonOption) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    comparison: newlySelectedComparison,
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
            changeSelectedSubcategory: (newlySelectedSubcategory: MedicineSubcategoryName) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    subcategory: newlySelectedSubcategory,
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
            changeSelectedRegion: (newlySelectedRegion: RegionOption) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    region: newlySelectedRegion,
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
            changeSelectedStoreFormat: (newlySelectedStoreFormat: StoreFormatOption) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    storeFormat: newlySelectedStoreFormat,
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
            changeSelectedCustomerSegment: (newlySelectedCustomerSegment: CustomerSegmentOption) => {
                  this.setState(
                        (prevState: AppState) => ({
                              selectedFilters: {
                                    ...prevState.selectedFilters,
                                    customerSegment: newlySelectedCustomerSegment,
                              },
                              dataViewNeedsUpdating: true,
                        } as AppState)
                  )
            },
      }

      componentDidMount() {
            window.addEventListener(
                  'scroll',
                  this.conditionallySetMeasureSelectorContainerVisibleStateBasedOnScrollY
            )
      }

      componentWillUnmount() {
            window.removeEventListener(
                  'scroll', 
                  this.conditionallySetMeasureSelectorContainerVisibleStateBasedOnScrollY
            )
      }

      conditionallySetMeasureSelectorContainerVisibleStateBasedOnScrollY = () => {
            let measureInDetailContentBoardRightNodeContainerBoundingClientRect = this.refToDataViewComponent.refToMeasureInDetailCollapsibleContentBoard.refToRightNodeContainer.getBoundingClientRect() as DOMRect

            this.setState({
                  measureSelectorContainerVisible: (measureInDetailContentBoardRightNodeContainerBoundingClientRect.top > 0) ? false : true,
            })
      }

      render() {
            const {
                  selectedFilters,
                  displayedFilters,
                  dataViewNeedsUpdating,
            
                  selectedMeasure,
            
                  measuresSummaryExpanded,
                  measuresInDetailExpanded,
                  KPITreesExpanded,
            
                  trendGraphExpanded,
                  splitBySubcategoriesExpanded,
                  splitByStoreFormatsExpanded,
                  splitByCustomerSegmentsExpanded,
                  splitByRegionsExpanded,
                  
                  measureSelectorContainerVisible,
            } = this.state

            return (
                  <div>
                        <header
                              className={s.headerContainer}
                        >
                              <img src={PROTOIMG_nav_header} />
                        </header>

                        <header
                              className={s.tabsBarContainer}
                        >
                              <img src={PROTOIMG_nav_tabs} />
                        </header>

                        <main
                              className={s.main}
                        >
                              <div
                                    className={s.sideBarContainer}
                              >
                                    <Sidebar 
                                          appState={this.state}
                                          actions={this.actions}
                                    />
                              </div>

                              <DataViewComponent 
                                    appState={this.state}
                                    setAppState={this.setAppState}
                                    ref={
                                          (component: DataViewComponent) => {
                                                this.refToDataViewComponent = component
                                          }
                                    }
                              />
                        </main>

                        <footer
                              className={s.footer}
                        >
                              <img src={PROTOIMG_nav_footer} />
                        </footer>

                  </div>
            )
      }
}

export default hot(module)(App)
