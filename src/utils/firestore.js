import { dbfs } from "../main";
import { setDoc } from "firebase/firestore";

export default {
  methods: {
    writeMetaUser(uid, data) {
      setDoc(dbfs, "users/" + uid, { data });
    },
    writeResponseData(uid, response_class, data) {
      setDoc(dbfs, "users/" + uid + "/" + response_class, { data });
    },
  },
};
