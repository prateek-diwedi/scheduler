import React, { useState, useEffect } from "react";

import { getInterviewersForDay } from "../helpers/selectors";

import axios from "axios";

import { getAppointmentsForDay } from "../helpers/selectors";



export default function useApplicationData() {
  // ------------------------------ use state for setting days data --------------------------//
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

   const appointments = getAppointmentsForDay(state, state.day);

  //// ----------------------------------- book interviews ------------------------------------//
  function bookInterview(id, interview) {

    console.log("booking made", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //post to server
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
  }

  /// --------------------------------------- cancel booking -----------------------------------//
  function cancelInterview(id, interview) {
    console.log("canceled booking", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`, { interview: null})
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
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
      setState(prev => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });

  }, []);

  return {state, setDay, bookInterview, cancelInterview}
} 