import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { DelegationCreatePage } from "../src/features/DelegationCreatePage/DelegationCreatePage.component";
import { addNewDelegation } from "../src/actions/delegations.actions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
    subbmiting: false,
    invalid: false
  };

  const enzymeWrapper = shallow(<DelegationCreatePage {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("Create Delegation Page", () => {
  let enzymeWrapper;
  let props;

  beforeEach(() => {
    ({ enzymeWrapper, props } = setup());
  });

  it("should render correctly", () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it("should call submit with delegation object", () => {
    const value = {
      startDate: "02-03-2004",
      endDate: "02-03-2004",
      delegationObjective: "testObjective",
      destinationCountry: "testCountry",
      destinationLocation: "testLocation",
      perDiem: 1.0,
      currency: "PLN",
      advancePayment: 200
    };
    enzymeWrapper.find("Form").simulate("submit", value);
    expect(props.handleSubmit).toBeCalledWith(value);
  });

  it("should render 11 Inputs", () => {
    expect(enzymeWrapper.find("Input").length).toBe(11);
  });

  it("should render destinationCountry Input", () => {
    expect(enzymeWrapper.find("Input[name='destinationCountryId']").length).toBe(1);
  });

  it("should render destinationLocation Input", () => {
    expect(enzymeWrapper.find("Input[name='destinationLocation']").length).toBe(1);
  });

  it("should render delegationObjective Input", () => {
    expect(enzymeWrapper.find("Input[name='delegationObjective']").length).toBe(1);
  });

  it("should render startDate DatePicker", () => {
    expect(enzymeWrapper.find("Input[name='startDate']").length).toBe(1);
  });

  it("should render endDate DatePicker", () => {
    expect(enzymeWrapper.find("Input[name='endDate']").length).toBe(1);
  });

  it("should render currencyPicker", () => {
    expect(enzymeWrapper.find("Input[name='diet.currency']").length).toBe(1);
  });

  it("should render diet.perDiem input", () => {
    expect(enzymeWrapper.find("Input[name='diet.perDiem']").length).toBe(1);
  });

  it("should render advancePayment input", () => {
    expect(enzymeWrapper.find("Input[name='advancePayment']").length).toBe(1);
  });

  it("should render meals.breakfasts input", () => {
    expect(enzymeWrapper.find("Input[name='meals.breakfasts']").length).toBe(1);
  });

  it("should render meals.lunches input", () => {
    expect(enzymeWrapper.find("Input[name='meals.lunches']").length).toBe(1);
  });

  it("should render meals.dinners input", () => {
    expect(enzymeWrapper.find("Input[name='meals.dinners']").length).toBe(1);
  });

  it("should dispatch action", () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch(addNewDelegation());

    const actions = store.getActions();
    const expectedPayload = "DELEGATIONS_ADD_DELEGATION";
    expect(actions[0].type).toEqual(expectedPayload);
  });
});
