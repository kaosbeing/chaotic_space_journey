
export interface Notification {
    type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO',
    title: string,
    message: string
}