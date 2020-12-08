import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

// export default function InterviewerList(props) {
//     const test = props.interviewers.map((item) => {
//      return item;
//      }
//   );

//     return (
//       <section className="interviewers">
//         <h4 className="interviewers__header text--light">Interviewer</h4>
//         <ul className="interviewers__list">
//           {test}
//         </ul>
//       </section>
//     );
// }


export default function InterviewerList(props) {
  const interviewer = props.interviewers.map((interviewer) => {
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          <InterviewerListItem
            id = {interviewer.id}
            name = {interviewer.name}
            avatar = {interviewer.avatar}
            selected = {interviewer.id === props.interviewer}
            setDay = {props.setInterviewer}
          />
        </ul>
      </section>
    );
  });
  return interviewer;
}
