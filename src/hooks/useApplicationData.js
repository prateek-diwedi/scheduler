import React, { useReducer, useEffect } from "react";

import { getInterviewersForDay } from "../helpers/selectors";

import axios from "axios";

import { getAppointmentsForDay } from "../helpers/selectors";



export default function useApplicationData() {
  // --------------------------------------------- use Reducer --------------------------------------- //
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_INTERVIEWERS = "SET_INTERVIEWERS"

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.value
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
          interviewersDay: action.interviewersDay
        }
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
  
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
  
        return {...state, appointments};
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }


  // ------------------------------ use state for setting days data --------------------------//
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: {}
  });

  //const setDay = day => dispatch({ ...state, day });
  function setDay(day) {
    dispatch({ type: SET_DAY, value: day })
  };

  // const appointments = getAppointmentsForDay(state, state.day);

  //// ----------------------------------- book interviews ------------------------------------//
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(()=>{dispatch({type: SET_INTERVIEW, interview : interview , id : id})})
  }

  /// --------------------------------------- cancel booking -----------------------------------//
  function cancelInterview(id, interview) {
    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(()=>{dispatch({type: SET_INTERVIEW, interview : interview , id : id})})
  }

  // --------------------------------- getting data from api ------------------------------//
  useEffect(() => {
    const days = axios.get("api/days");
    const appointment = axios.get("/api/appointments");
    const interviewers = axios.get("/api/interviewers");
    Promise.all([
      Promise.resolve(days),
      Promise.resolve(appointment),
      Promise.resolve(interviewers)
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    });

  }, []);

  return { state, setDay, bookInterview, cancelInterview }
} 