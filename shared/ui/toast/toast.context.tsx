import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
} from 'react';
import { Animated } from 'react-native';
import { ToastView } from './toast.component';
import { ToastState, ToastType } from './toast.types';
import { log } from '@/shared/debug/startupLog';

type ToastContextType = {
    showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    log("ToastProvider render");
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'success',
        visible: false,
    });

    const opacity = useRef(new Animated.Value(0)).current;

    const showToast = (message: string, type: ToastType = 'success') => {
        // show toast
        setToast({
            message,
            type,
            visible: true,
        });

        // fade in
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // auto hide
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setToast(prev => ({ ...prev, visible: false }));
            });
        }, 2500);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast.visible && (
                <Animated.View
                    style={{
                        opacity,
                        position: 'absolute',
                        left: 16,
                        right: 16,
                        bottom: 76,
                        zIndex: 9999,
                    }}
                >
                    <ToastView message={toast.message} type={toast.type} />
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used inside ToastProvider');
    }

    return context;
};