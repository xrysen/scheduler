import React from 'react';
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {

  let listClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  const formatSpots = () => {
    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    } else if (props.spots === 0) {
      return `no spots remaining`;
    }
    return `${props.spots} spots remaining`;
  }

  return (
    <li className = {listClass} onClick={props.setDay} data-testid="day">
      <h2 className = "text--regular" >{props.name}</h2>
      <h3 className = "text--light">{formatSpots()}</h3>
    </li>
  );
}