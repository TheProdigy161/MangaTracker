import { v4 } from 'uuid';

const DEVICE_ID_STORAGE_NAME: string = 'MANGA_TRACKER_DEVICE_ID';

export abstract class UuidGenerator {
    public static getDeviceId() {
        // Try to get UUID from local storage.
        let uuid = localStorage.getItem(DEVICE_ID_STORAGE_NAME);

        // If UUID is not present, then create a new one.
        if (!uuid) {
            uuid = UuidGenerator.createNewUuid();
            localStorage.setItem(DEVICE_ID_STORAGE_NAME, uuid);
        }

        return uuid;
    }

    private static createNewUuid(): string {
        const newUuid = v4();
        return newUuid;
    }
}