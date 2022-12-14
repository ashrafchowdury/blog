import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//Custom Notification using the react-tost packege
export const notification = (msg, title) => {
  //position is notification position, autoClose is notification closing time
  const info = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
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
