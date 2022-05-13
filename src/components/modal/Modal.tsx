import "./Modal.scss";

type Props = {
  children: React.ReactNode;
  shown: React.SetStateAction<boolean>;
  close: () => void;
  modalContentClass?: string;
};

const Modal = ({ children, shown, close, modalContentClass }: Props) => {
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className={`modal-content  ${
          modalContentClass ? modalContentClass : ""
        }`}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {/* <button onClick={close}>Close</button> */}
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
