import { getDatabase, ref, push } from "firebase/database";

const db = getDatabase();

export default {
    methods: {
        writeEvent(uid, event_class, event_data) {
            push(ref(db, 'users/' + uid + '/' + event_class), { event_data })
        }
    }
}