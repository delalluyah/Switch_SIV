import actions from "../actions";
const initialState = { grandTotal: 0, products: [] };
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_SALES_RECORD:
      return { ...state, ...payload };

    case actions.CLEAR_SALES_RECORD:
      return {};
    default:
      return state;
  }
};
