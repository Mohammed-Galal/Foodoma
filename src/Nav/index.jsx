<<<<<<< HEAD
import desktop from "./desktop";
import mobile from "./mobile";
import "./index.scss";

export default function (isMobileDevice) {
  return isMobileDevice ? mobile() : desktop;
}
=======
import desktop from "./desktop";
import mobile from "./mobile";
import "./index.scss";

export default function (isMobileDevice) {
  return isMobileDevice ? mobile() : desktop;
}
>>>>>>> 8828f8872f24d5af85ad0af7e8efc7f7c81bcb4c
