import { toast } from "react-toastify";

export function notify(message: string, type: 'error' | 'warning' | 'info' | 'success') {
    if(type === 'error') {
        toast(message, { type });
    }
    if(type === 'warning') {
        toast(message, { type });
    }
    if(type === 'info') {
        toast(message, { type });
    }
    if(type === 'success') {
        toast(message, { type });
    }
}