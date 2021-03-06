import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { func, bool, array } from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  fetchMyDelegations,
  setDelegations,
  setTempDelegations,
  setDatesAreValid,
  setIsSortFilterPanelCollapsed
} from "../../actions/delegations.actions";
import {
  getDelegations,
  getDelegationsFetching,
  getTempDelegations,
  getDatesAreValid,
  getIsSortFilterPanelCollapsed
} from "../../selectors/delegations.selectors";
import DelegationsScreen from "./DelegationsScreen.component";
import styles from "./DelegationsScreen.module.scss";

const sorters = {
  DateFrom: function(a, b) {
    return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
  },
  DateTo: function(a, b) {
    return a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0;
  },
  Country: function(a, b) {
    return a.country < b.country ? -1 : a.country > b.country ? 1 : 0;
  },
  City: function(a, b) {
    return a.destinationLocation < b.destinationLocation ? -1 : a.destinationLocation > b.destinationLocation ? 1 : 0;
  },
  Status: function(a, b) {
    return a.status < b.status ? -1 : a.status > b.status ? 1 : 0;
  }
};

class DelegationsScreenContainer extends Component {
  static propTypes = {
    datesAreValid: bool,
    delegations: array,
    fetchMyDelegations: func,
    fetching: bool,
    isSortFilterPanelCollapsed: bool,
    setDatesAreValid: func,
    setIsSortFilterPanelCollapsed: func,
    setTempDelegations: func,
    tempDelegations: array
  };

  iconName = "md-arrow-drop";

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Delegations",
      headerTintColor: styles.primary,
      headerRight: (
        <TouchableOpacity
          style={styles.collapseButtonHeader}
          onPress={navigation.getParam("changeIsSortFilterPanelCollapsed")}
        >
          <MaterialCommunityIcons name="filter-outline" style={styles.iconStyle} />
        </TouchableOpacity>
      )
    };
  };

  _changeIsSortFilterPanelCollapsed = () => {
    this.props.setIsSortFilterPanelCollapsed(!this.props.isSortFilterPanelCollapsed);
  };

  componentDidMount() {
    this.props.fetchMyDelegations();
    this.props.navigation.setParams({
      changeIsSortFilterPanelCollapsed: this._changeIsSortFilterPanelCollapsed
    });
  }

  filter = values => {
    const { startDate, endDate, delegationStatus } = values;

    if (this._datesAreValid(startDate, endDate)) {
      this.props.setDatesAreValid(true);
      const startDateTime = this._getTime(startDate);
      const endDateTime = this._getTime(endDate);
      const status = delegationStatus === undefined ? "" : delegationStatus;

      const filteredDelegations = this.props.delegations.filter(d => {
        return (
          this._getTime(d.startDate) >= startDateTime &&
          this._getTime(d.endDate) <= endDateTime &&
          d.status.includes(status)
        );
      });
      this.props.setTempDelegations(filteredDelegations);
    } else {
      this.props.setDatesAreValid(false);
    }
  };

  sortItems = values => {
    const { sortBy } = values;
    const delegations = [...this.props.tempDelegations];
    const sortedDelegations = delegations.sort(sorters[sortBy]);

    this.props.setTempDelegations(sortedDelegations);
  };

  _getTime = date => {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    return dateOnly.getTime();
  };

  _datesAreValid = (startDate, endDate) => {
    return startDate < endDate;
  };

  render() {
    return (
      <DelegationsScreen
        delegations={this.props.tempDelegations}
        datesAreValid={this.props.datesAreValid}
        isSortFilterPanelCollapsed={this.props.isSortFilterPanelCollapsed}
        changeIsSortFilterPanelCollapsed={this._changeIsSortFilterPanelCollapsed}
        filter={this.filter}
        sortItems={this.sortItems}
        navigate={this.props.navigation}
        fetching={this.props.fetching}
        handleRefresh={this.props.fetchMyDelegations}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    delegations: getDelegations(state),
    fetching: getDelegationsFetching(state),
    tempDelegations: getTempDelegations(state),
    datesAreValid: getDatesAreValid(state),
    isSortFilterPanelCollapsed: getIsSortFilterPanelCollapsed(state)
  };
};

const mapDispatchToProps = {
  fetchMyDelegations,
  setDelegations,
  setTempDelegations,
  setDatesAreValid,
  setIsSortFilterPanelCollapsed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DelegationsScreenContainer);
