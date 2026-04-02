export type ToastType = 'success' | 'error' | 'info';

export interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
}