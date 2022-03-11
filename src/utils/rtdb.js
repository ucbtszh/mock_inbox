import { rtdb } from "../main";
import { ref, push } from "firebase/database";

export default {
  methods: {
    writeEvent(uid, event_class, event_data) {
      push(ref(rtdb, "users/" + uid + "/" + event_class), { event_data });
    },
  },
};
