import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase();

export default {
    methods: {
        writeEvent(uid, event_class, event_data) {
            set(ref(db, 'users/' + uid + '/' + event_class), { event_data })
        }
    }
}