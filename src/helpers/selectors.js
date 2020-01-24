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
    console.log('interviewer -->', interview);
    console.log("state in selector --->>", state);
    const interviewer = state.interviews[interview.interviewer];
    const interviewObj = { student, interviewer };
    console.log('interviewer --->>', interviewer);
    return interviewObj;
  }
};