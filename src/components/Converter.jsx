import { Box, NativeSelect, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useConvert } from '../contexts/ConverterContext';
const Converter = () => {
    const { currency, getCurrency } = useConvert();
    const [fromValute, setFromValute] = useState(0);
    const [toValute, setToValute] = useState(0);
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(0);
    const onChangePrice = (value) => {
        const price = value / fromValute;
        const result = price * toValute;
        setToPrice(result);
        setFromPrice(value);
    };
    const onChangeToPrice = (value) => {
        const result = (fromValute / toValute) * value;
        setFromPrice(result);
        setToPrice(value);
    };
    useEffect(() => {
        getCurrency();
    }, []);
    const handleInp = (e) => {
        setFromValute(e.target.value);
        console.log(fromValute);
    };
    const handleInp2 = (e) => {
        setToValute(e.target.value);
    };
    // const RUB = {
    //     CharCode: 'RUB',
    //     ID: 'R01111',
    //     Value: 1,
    //     Nominal: 1,
    //     Name: 'Российский рубль',
    // };
    return (
        <Box>
            <Typography sx={{ m: 2 }}>Конвертер валют</Typography>
            <Box
                sx={{
                    width: '70%',
                    height: '300px',
                    border: '1px solid gray',
                    margin: '50px auto',
                    padding: 2,
                    borderRadius: '20px',
                    boxShadow: '5px 5px 1px 0px rgba(0,0,0,0.25)',
                }}
            >
                <Box
                    sx={{
                        margin: '10px auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <NativeSelect
                        inputProps={{
                            name: 'valute',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => handleInp2(e)}
                    >
                        {/* <option name={RUB.CharCode} value={1}>
                            {RUB.Name}
                        </option> */}
                        {currency.map((valute) => (
                            <option
                                key={valute.ID}
                                name={valute.CharCode}
                                value={(valute.Value / valute.Nominal).toFixed(
                                    4
                                )}
                            >
                                {valute.Name}
                            </option>
                        ))}
                    </NativeSelect>
                    <NativeSelect
                        defaultValue={'Доллар США'}
                        inputProps={{
                            name: 'valuteTo',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => handleInp(e)}
                    >
                        {/* <option name={RUB.CharCode} value={1}>
                            {RUB.Name}
                        </option> */}
                        {currency.map((valute) => (
                            <option
                                key={valute.ID}
                                name={valute.CharCode}
                                value={(valute.Value / valute.Nominal).toFixed(
                                    4
                                )}
                            >
                                {valute.Name}
                            </option>
                        ))}
                    </NativeSelect>
                </Box>
                <Box
                    sx={{
                        width: '90%',
                        margin: '0 auto',
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextField
                        sx={{ width: '45%' }}
                        value={fromPrice}
                        type={'number'}
                        onChange={(e) => onChangePrice(e.target.value)}
                    ></TextField>
                    <TextField
                        sx={{ width: '45%' }}
                        value={toPrice}
                        type={'number'}
                        onChange={(e) => onChangeToPrice(e.target.value)}
                    ></TextField>
                </Box>
            </Box>
        </Box>
    );
};

export default Converter;
