function getAppointmentsForDay(state, day) {
  let appointmentKeys = "";
  if (state.appointments) {
    appointmentKeys = Object.keys(state.appointments);
  }
  const filtered = state.days.filter((days) => days.name === day);
  let result = [];

  if (!appointmentKeys || !filtered.length) {
    return [];
  }

  const appointmentIds = filtered[0].appointments;
  for (const appointment of appointmentIds) {
    for (const key of appointmentKeys) {
      if (state.appointments[key].id === appointment) {
        result.push(state.appointments[key]);
      }
    }
  }
  return result;
}

function getInterview(state, interview) {
  let result = {};

  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  result = { ...interview, interviewer: interviewer };
  return result;
}

export { getAppointmentsForDay, getInterview };