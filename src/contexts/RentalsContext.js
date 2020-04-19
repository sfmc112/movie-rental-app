import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from '../firebase';
import { UserContext } from './index';
import get from 'lodash/get';

const RentalsContext = createContext({}); // eslint-disable-line

const RentalsStore = () => {
    const { currentUser } = useContext(UserContext);
    const [ userRentals, setUserRentals ] = useState([]);
    const userId = get(currentUser, 'uid');

    useEffect(() => {
        if(userId) {
            const db = firebase.firestore();
            return db.collection('rentals')
                .where('user_id', '==', userId)
                .onSnapshot((snapshot) => {
                    const rentals = [];

                    snapshot.forEach(doc => rentals.push({
                        movie: {
                            ...doc.data(),
                        },
                        id: doc.id,
                    }));

                    setUserRentals(rentals);
                });
        }
    }, [userId]);

    return {
        userRentals,
    };
};

export const RentalsProvider = children => <RentalsContext.Provider value={ RentalsStore() } { ...children } />;

export default RentalsContext;
