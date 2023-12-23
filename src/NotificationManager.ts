import { Notification } from "./Models/NotificationInterface";

class NotificationManager {
    static notifications: Notification[] = [];

    static pushNotification(type: Notification['type'], title: string, message: string): Notification {
        const notification: Notification = { type, title, message };
        this.notifications.push(notification);
        return notification;
    }

    static removeNotification(notification: Notification): void {
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
            this.notifications.splice(index, 1);
        }
    }
}


export default NotificationManager;
