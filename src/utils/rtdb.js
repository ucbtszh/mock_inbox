import { rtdb } from "../main";
import { ref, push } from "firebase/database";

export default {
  methods: {
    writeEvent(uid, event_class, event_data) {
      if(!uid) {
        uid = localStorage.getItem('userUUID');
      }
      push(ref(rtdb, "users/" + uid + "/" + event_class), { event_data });
    },
  },
};
