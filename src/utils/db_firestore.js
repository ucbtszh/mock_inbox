import { db } from '../main'

const usersCollecton = db.collection("users");

export default {
  methods: {
    writeMetaUser(uid, data) {
      usersCollecton
        .doc(uid)
        .set(data)
        // .then(() => {
        //   console.log("New user collection successfully created.");
        // })
        .catch((error) => {
          console.error("Error creating document: ", error);
        });
    },
    writeResponseData(uid, responseName, data) {
      let newPath = usersCollecton
        .doc(uid)
        .collection("responses")
        .doc(responseName);
      newPath
        .set(data)
        // .then(() => {
        //   console.log(responseName, "data successfully written.");
        // })
        .catch((error) => {
          console.error("Error writing", responseName, " data: ", error);
        });
    },
  },
};
