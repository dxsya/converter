import axios from 'axios';
import React, { createContext, useContext, useReducer, useState } from 'react';

const converterContext = createContext();
export const useConvert = () => {
    return useContext(converterContext);
};
const API = 'https://www.cbr-xml-daily.ru/daily_json.js';

const INIT_STATE = {
    currency: [],
};

function reducer(state = INIT_STATE, action) {
    switch (action.type) {
        case 'GET_CURRENCY': {
            return { ...state, currency: action.payload };
        }
        default:
            return state;
    }
}

const ConverterContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    async function getCurrency() {
        const data = await axios(API);
        const RUB = {
            CharCode: 'RUB',
            ID: 'R01111',
            Value: 1,
            Nominal: 1,
            Name: 'Российский рубль',
        };
        const dataArray = [];
        for (let i in data.data.Valute) {
            dataArray.push(data.data.Valute[i]);
        }
        dataArray.push(RUB);
        dispatch({
            type: 'GET_CURRENCY',
            payload: dataArray,
        });
    }

    const values = { currency: state.currency, getCurrency };
    return (
        <converterContext.Provider value={values}>
            {children}
        </converterContext.Provider>
    );
};

export default ConverterContext;
