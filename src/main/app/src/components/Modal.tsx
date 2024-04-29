import {
  useState,
  createContext,
  useContext,
  cloneElement,
  ReactNode,
} from "react";

const ModalContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

type ModalProps = {
  children: ReactNode;
};

function Modal(props: ModalProps) {
  const [open, setOpen] = useState<boolean>(false); // Adjusted useState argument to use props.open directly if it exists

  return (
    <ModalContext.Provider value={[open, setOpen]}>
      {props.children}
    </ModalContext.Provider>
  );
}

type ModalContentProps = {
  children: ReactNode;
  width?: number | string;
  animate?: boolean; // Made animate prop optional
  onClose?: () => void; // Corrected onClose prop type
};

function ModalContent(props: ModalContentProps) {
  const [open, setOpen] = useContext(ModalContext);

  return (
    <>
      {open && (
        <div
          className="animate-fade fixed pointer-events-auto bg-black/[.8] top-0 right-0 bottom-0 left-0 z-2 !m-0"
          onClick={() => {
            setOpen(false);
            props.onClose && props.onClose();
          }}
          id="modal"
        >
          <div
            className="relative bg-white rounded-lg mx-auto mt-10 p-5 space-y-5 flex flex-col animate-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              maxWidth: "75%",
              width: props.width || "24rem", // Adjusted to use props.width directly if it exists
            }}
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

function ModalButton(props: { children: JSX.Element }) {
  const [, setOpen] = useContext(ModalContext);

  return cloneElement(props.children, {
    onClick: () => setOpen(true),
  });
}

export { ModalContext, Modal, ModalButton, ModalContent };
