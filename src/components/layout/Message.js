import { useEffect } from "react";
import styles from "./Message.module.css";

function Message({ type, msg, setMessage }) {
  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000); // desaparece após 3s

    return () => clearTimeout(timer);
  }, [msg, setMessage]);

  if (!msg) return null;

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {msg}
    </div>
  );
}

export default Message;
