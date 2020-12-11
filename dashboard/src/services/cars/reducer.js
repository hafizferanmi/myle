import * as actionTypes from "./actionTypes";
import Immutable from 'seamless-immutable';


export const initialState = new Immutable({
  cars                    : [],
  cars_processing         : false,

  car: null,
  car_processing          : false,

  remove_car_processing   : false,
  activate_car_processing : false,
  update_car_processing : false
});

export default function CarsReducer(state = initialState, action) {
  switch(action.type) {

// REMOVE CAR
    case actionTypes.GET_CARS_REQUEST:
      return state.merge({
        cars_processing: true
      });
    case actionTypes.GET_CARS_SUCCESS:
      return state.merge({
        cars_processing : false,
        cars            : action.cars
      });
    case actionTypes.GET_CARS_FAIL:
      return state.merge({
        cars_processing : false
      });
    case actionTypes.GET_CARS_ERROR:
      return state.merge({
        cars_processing : false
      });

// REMOVE CAR
    case actionTypes.REMOVE_CAR_REQUEST:
      return state.merge({
        remove_car_processing   : true
      });
    case actionTypes.REMOVE_CAR_SUCCESS:
      return state.merge({
        remove_car_processing: false
      });
    case actionTypes.REMOVE_CAR_FAIL:
      return state.merge({
        remove_car_processing   : false
      });
    case actionTypes.REMOVE_CAR_ERROR:
      return state.merge({
        remove_car_processing   : false
      });

// ACTIVATE CAR
    case actionTypes.ACTIVATE_CAR_REQUEST:
      return state.merge({
        activate_car_processing   : true
      });
    case actionTypes.ACTIVATE_CAR_SUCCESS:
      return state.merge({
        activate_car_processing: false
      });
    case actionTypes.ACTIVATE_CAR_FAIL:
      return state.merge({
        activate_car_processing   : false
      });
    case actionTypes.ACTIVATE_CAR_ERROR:
      return state.merge({
        activate_car_processing   : false
      });


// UPDATE CAR
    case actionTypes.UPDATE_CAR_REQUEST:
      return state.merge({
        update_car_processing   : true,
      });
    case actionTypes.UPDATE_CAR_SUCCESS:
      return state.merge({
        update_car_processing   : false
      });
    case actionTypes.UPDATE_CAR_FAIL:
    case actionTypes.UPDATE_CAR_ERROR:
      return state.merge({
        update_car_processing   : false
      });

// RETRIEVE CAR
    case actionTypes.RETRIEVE_CAR_REQUEST:
      return state.merge({
        car_processing : true
      });
    case actionTypes.RETRIEVE_CAR_SUCCESS:
      return state.merge({
        car            : action.car,
        car_processing : false
      });
    case actionTypes.RETRIEVE_CAR_FAIL:
    case actionTypes.RETRIEVE_CAR_ERROR:
      return state.merge({
        car_processing : false
      });

    default:
      return state;
  }
}








