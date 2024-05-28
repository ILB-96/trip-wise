import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

const withAuthProvider = (Component) => {
    return function WrapperComponent(props) {
        return (
            <AuthProvider>
                <Component {...props} />
            </AuthProvider>
        );
    };
};

export default withAuthProvider;
