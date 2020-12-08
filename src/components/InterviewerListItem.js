import React from "react";
import "./InterviewerListItem";

export default function InterviewerListItem (props) {

  return (
    <li key = {props.id} className="interviewers__item">
      <img 
        className="interviewers__item-image"
        src = {props.avatar}
        alt = {props.name}
        />
        {props.name}
    </li>
  );
}