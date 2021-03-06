import React from "react";
import { View } from "react-native";
import { bool, object } from "prop-types";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import StatusProp from "../../../components/StatusProp/StatusProp.component";
import Button from "../../../components/Button/Button.component";
import PlatformIcon from "../../../components/PlatformIcon/PlatformIcon.component";
import RenderDetailsRow from "../../../components/renderers/RenderDetailsRow/RenderDetailsRow.renderer";

import styles from "./DelegationDetails.module.scss";
import colors from "../../../assets/styles/_colorPalette.scss";

const detailsIconSize = 24;
const submitIconSize = 20;

const DelegationDetails = props => {
  const {
    delegationObjective,
    destinationCountry,
    destinationLocation,
    diet,
    endDate,
    startDate,
    status
  } = props.delegation;
  return (
    <View style={[styles.delegation, styles[status]]}>
      <View style={styles.status}>
        <StatusProp status={status} />
      </View>
      <RenderDetailsRow
        title="Destination:"
        content={`${destinationCountry} - ${destinationLocation}`}
        icon={<PlatformIcon size={detailsIconSize} color={colors.primaryTextColor} name="pin" style={styles.pin} />}
        fetching={props.fetching}
      />
      <RenderDetailsRow
        title="Delegation period:"
        content={`${startDate} - ${endDate}`}
        icon={<MaterialIcons size={detailsIconSize} color={colors.primaryTextColor} name="date-range" />}
        fetching={props.fetching}
      />
      <RenderDetailsRow
        title="Diet:"
        content={`${diet.perDiem} ${diet.currency}`}
        icon={<MaterialCommunityIcons size={detailsIconSize} color={colors.primaryTextColor} name="food-apple" />}
        fetching={props.fetching}
      />
      <RenderDetailsRow
        title="Objective:"
        content={`${delegationObjective}`}
        icon={<MaterialCommunityIcons size={detailsIconSize} color={colors.primaryTextColor} name="target" />}
        fetching={props.fetching}
      />
      <View style={styles.submit}>
        <Button
          title="Submit delegation"
          icon={<FontAwesome size={submitIconSize} color={colors.primaryTextColor} name="send" />}
        />
      </View>
    </View>
  );
};

DelegationDetails.propTypes = {
  delegation: object,
  fetching: bool
};

export default DelegationDetails;
