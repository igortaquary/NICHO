import React, { useContext, createContext, useEffect, useState } from 'react';
import { signIn } from '../api/auth';
import fetchUser from '../api/fetchUser';
import { signUp } from '../api/signup';

const UserContext = createContext({});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const SignIn = async (email, password, navigation) => {
        const loggedUid = await signIn(email, password);
        const currentUser = await fetchUser(loggedUid);
        setUser(currentUser);
        console.log(currentUser);
        navigation.navigate('Main');
    }

    const SignUp = async (name, email, user, password, gender, region, newsletter, navigation, image) => {
        await signUp(name, email, user, password, gender, region, newsletter, image);
        await SignIn(email, password, navigation);
    }

    return (
        <UserContext.Provider value={{ user: user, SignIn, SignUp }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { UserProvider, useUserContext }
