import { dbfs } from "../main";
import { doc, setDoc } from "firebase/firestore";

export default {
  methods: {
    writeMetaUser(uid, data) {
      setDoc(doc(dbfs, "users", uid), data);
    },
    writeResponseData(uid, response_class, data) {
      setDoc(doc(dbfs, "users", uid, "responses", response_class), data);
    },
  },
};
