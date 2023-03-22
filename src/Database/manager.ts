import {Database, getDatabase, onValue, ref, set} from "firebase/database";

import { initializeApp, FirebaseApp } from "firebase/app";
import {ScoutData} from "./type";

class DatabaseManager {

    private subscribers: { (data: ScoutData): void; } [];
    private readonly app: FirebaseApp
    private readonly database: Database
    private lastSnapshot: ScoutData | undefined;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyDINOpzcgvzRGLTiVitifRXS2aOFuqpuMw",
            authDomain: "scout-1955a.firebaseapp.com",
            projectId: "scout-1955a",
            storageBucket: "scout-1955a.appspot.com",
            messagingSenderId: "601144953846",
            appId: "1:601144953846:web:9c673f4bec491588b215d7",
            measurementId: "G-8VRG57LGGX"
        };

        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app)
        this.subscribers = []

        onValue(ref(this.database, `/`), (snap) => {
            this.lastSnapshot = snap.val();
            this.subscribers.forEach((callback) => {
                callback(snap.val());
            });
        });
    }

    subscribe(callback: (snap: ScoutData) => void) {
        this.subscribers.push(callback);
        if (this.lastSnapshot !== undefined) {
            callback(this.lastSnapshot)
        }
    }

    get() {
        return this.lastSnapshot;
    }

    set(path: string, value: unknown) {
        console.log(path, value)
        set(ref(this.database, path), value).then();
    }

}

const manager = new DatabaseManager();

export default manager;