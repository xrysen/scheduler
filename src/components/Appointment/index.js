import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Delete from "./Delete";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
    .catch(() => {
      transition(ERROR_SAVE, true);
    });
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id, props.interview).then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
    });
  }

  let interviewerName = "";
  if (props.interview) {
    for (const key of props.interviewers) {
      if (key.id === props.interview.interviewer) {
        interviewerName = key.name;
      }
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === ERROR_SAVE && (
        <Error message = "There was an error while saving your request" onClose = {back}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message = "There was an error while deleting your interview" onClose = {back}/>
      )}
      {mode === DELETE && (
        <Delete
          message="Are you sure you want to delete this appointment?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={interviewerName}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}
