const TYPES = {
  START_INIT: "START_INIT",
  FINISH_INIT: "FINISH_INIT",
};
const defaultValue = {
  loading: true,
  data: []
};
const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.START_INIT: {
      return {
        loading: true,
        data: []
      };
    }
    case TYPES.FINISH_INIT: {
      return {
        loading: false,
        data: action.payload
      };
    }
    default:
      return { ...state };
  }
};
const marketReducer = {
  TYPES,
  defaultValue,
  reducer
};
export default marketReducer;