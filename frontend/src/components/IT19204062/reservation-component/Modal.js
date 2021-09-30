import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
export default function Modal(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <CModal show={openPopup} closeOnBackdrop={false}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
        <CButton
          className="btn-sm"
          color="secondary"
          onClick={() => setOpenPopup(false)}
        >
          X
        </CButton>
      </CModalHeader>
      <CModalBody>{children}</CModalBody>
    </CModal>
  );
}
