import './NotificationComponent.css';
import { Notification } from '../../Models/NotificationInterface';

const NotificationComponent = ({ notification }: { notification: Notification }) => {
    const { type, title, message } = notification;

    return (
        <div className='notification'>
            <div className='notification__header'>
                <img className='notification__icon' src="" alt="" />
                <h3 className={`notification__title notification__title--${type}`}>{title}</h3>
            </div>
            <p className='notification__message'>{message}</p>
        </div>
    );
};

export default NotificationComponent;
