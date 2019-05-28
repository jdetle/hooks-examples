import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "../components/modal";

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(!state);
  return [state, toggle];
};

const Toggle = () => {
  const [showModal, toggleModal] = useToggle(false);
  return (
    <div>
      <Button onClick={toggleModal}>Toggle Modal</Button>
      <Modal
        data-testid="confirm-deletion-modal"
        show={showModal}
        confirmModalAction={toggleModal}
        closeModal={toggleModal}
        dialogTitle="Hello there friend! I am a modal"
      />
    </div>
  );
};

export default Toggle;
