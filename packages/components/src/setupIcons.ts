import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

let didSetup = false;

export function setupIcons() {
  if (didSetup) return;
  library.add(fas);
  didSetup = true;
}
