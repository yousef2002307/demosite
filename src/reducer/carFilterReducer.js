export const initialState = {
  loading: true,
  error: null,
  cars: [],
  totalItems: 0,
  lastPage: 1,
  price: [50000, 100000],
  km: [50000, 100000],
  year: [2017, 2024],
  body: "Any Body",
  make: "Any Make",
  model: "Any Model",
  fuel: "Any Fuel",
  transmission: "Any Transmission",
  location: "Any Location",
  door: "Any Door",
  cylinder: "Any Cylinder",
  color: "Any Color",

  features: [],
  filtered: [],
  sortingOption: "Sort by (Default)",
  sorted: [],
  currentPage: 1,
  itemPerPage: 12,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_CARS":
      return {
        ...state,
        cars: action.payload.data || [],
        filtered: action.payload.data || [],
        sorted: action.payload.data || [],
        totalItems: action.payload.meta.total || 0,
        lastPage: action.payload.meta.last_page || 1,
        loading: false
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_KM":
      return { ...state, km: action.payload };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_BODY":
      return { ...state, body: action.payload };
    case "SET_MAKE":
      return { ...state, make: action.payload };
    case "SET_FUEL":
      return { ...state, fuel: action.payload };
    case "SET_TRANSMISSION":
      return { ...state, transmission: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_DOOR":
      return { ...state, door: action.payload };
    case "SET_CYLINDER":
      return { ...state, cylinder: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        price: [50000, 100000],
        km: [50000, 100000],
        year: [2017, 2024],
        body: "Any Body",
        make: "Any Make",
        model: "Any Model",
        fuel: "Any Fuel",
        transmission: "Any Transmission",
        location: "Any Location",
        door: "Any Door",
        cylinder: "Any Cylinder",
        color: "Any Color",

        features: [],
      };
    default:
      return state;
  }
}
