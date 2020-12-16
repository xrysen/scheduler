/**
 * getAppointMentsForDay(object, string)
 * input:
 *  State object,
 *  string day
 * Output:
 *  Returns an array of appointment id's that are currently set for the day passed in
 */

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

/**
 * getInterview(obj state, obj interview)
 * Input:
 *  state object
 *  interview object
 * Output:
 *  returns the interview object with the interviewer key overridden to show the interviewer for the current state
 */

function getInterview(state, interview) {
  let result = {};

  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  result = { ...interview, interviewer: interviewer };
  return result;
}

/**
 * getInterviewersForDay(obj state, string day)
 * Input:
 *  state object
 *  day string
 * Output:
 *  returns an array containing all the interviewer id's for the day(string) passed in
 */

function getInterviewersForDay(state, day) {
  let interviewerKeys = "";
  if (state.interviewers) {
    interviewerKeys = Object.keys(state.interviewers);
  }
  const filtered = state.days.filter((days) => days.name === day);
  let result = [];

  if (!interviewerKeys || !filtered.length) {
    return [];
  }

  const interviewerIds = filtered[0].interviewers;
  for (const interviewer of interviewerIds) {
    for (const key of interviewerKeys) {
      if (state.interviewers[key].id === interviewer) {
        result.push(state.interviewers[key]);
      }
    }
  }
  return result;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
