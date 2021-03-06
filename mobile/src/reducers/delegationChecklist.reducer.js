import { ACTIONS } from "../actions/delegationChecklist.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  delegationId: 0,
  activities: [],
  fetching: true,
  errors: null
};

const delegationChecklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${PENDING}`:
      return {
        ...state,
        delegationId: 0,
        activities: [],
        fetching: true
      };
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${FULFILLED}`:
      return {
        ...state,
        delegationId: action.payload.data.delegationId,
        activities: addKeysToItems(action.payload.data.activities),
        fetching: false
      };
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${REJECTED}`:
      showMessage({ message: "Error while fetching delegation checklist: " + action.payload.Message, type: "danger" });
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      };
    default:
      return { ...state };
  }
};

const addKeysToItems = items => {
  if (items === undefined) {
    return [];
  }

  return items.map(item => {
    return Object.assign(item, { key: `${item.id}` });
  });
};

export default delegationChecklistReducer;
