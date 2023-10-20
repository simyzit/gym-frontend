import React, {FC, ReactNode} from "react";
import cl from "./ModalStyles.module.css";
import { FaCross } from "react-icons/fa";

interface IModalProps {
  children: ReactNode,
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const Modal: FC<IModalProps>  = ({ children, visible, setVisible }) => {

  const rootClasses = [cl.modal];

  if (visible) {
    rootClasses.push(cl.active);
  }
  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
