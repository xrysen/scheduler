import { useState, useEffect } from "react";
import axios from "axios";

/**
 * useApplicationData()
 * Sets the initial state and also updates the state depending on the users actions
 */

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);


  const setDay = (day) => setState({ ...state, day });

  /**
   * updateSpots(day, action)
   * Input:
   *  string day
   *  string action
   * Output:
   *  Makes a copy of the state.days array, finds the index where the object's name propertiy is equal to the day passed in, and updates the spots properties of that *  object, returning an updated array of objects to be used when setting state.  
   */
  
  const updateSpots = (day, action) => {
    const days = JSON.parse(JSON.stringify(state.days));
    const index = days.findIndex((item) => item.name === day);

    if (action === "add") {
      days[index].spots += 1;
    } else {
      days[index].spots -= 1;
    }

    return days;
  };

  /**
   * bookInterview
   * Input:
   *  number id
   *  object interview
   *  string mode
   * Output:
   *  If the visual mode is set to CREATE, this function takes the values of the input field and selected interviewer in the Form component and will make a request to *  to the server to update the current time slot for the current day selected with the interview options entered by the user. It will also update the spots *remaining for the DayListItem component
   */

  const bookInterview = (id, interview, mode) => {
    let days = state.days;
    if(mode === "CREATE") {
      days = updateSpots(state.day, "subract");
    } 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  /**
   * cancelInterview(number id)
   * Input:
   *  number id
   * Output:
   *  Updates the value of state.appointments of the id passed in to null, making a request to the server to update the database. Effectively deleting an interview
   * It will also update the remaining spots available for the current day and timeslot selected.
   */

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
     const days = updateSpots(state.day, "add");
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
