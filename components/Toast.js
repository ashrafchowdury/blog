import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notification = (msg, title) => {
  //position is notification position, autoClose is notification closing time
  const info = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  };
  // warn is notification type,
  if (msg == "warn") {
    toast.warn(title, info);
  } else if (msg == "error") {
    toast.error(title, info);
  } else {
    toast.success(title, info);
  }
};
