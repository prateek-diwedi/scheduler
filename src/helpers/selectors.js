import React, { useState, useEffect } from "react"

export const getAppointmentsForDay = (state, day) => {
  const appointmentsDay = state.days
    .filter(states => states.name === day)
    .map(states => states.appointments)
    .reduce((acc, val) => acc.concat(val), []);
  const appointment = [];
  appointmentsDay.forEach(states => {
    appointment.push(state.appointments[states]);
  });
  return appointment;
};

export const getInterview = ( state, interview ) => {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObj = { student, interviewer };
    return interviewObj;
  }
};

export const getInterviewersForDay = (state, day) => {
  console.log('intervie helper --->> state', state);
  const dayObject = state.days.find( el => el.name === day);
  const dayInterviewers = dayObject.interviewers.map( interviewerId => state.interviewers[interviewerId] );
  console.log("yayyyyyyyyyy", dayInterviewers);
  return dayInterviewers;
};