
import React, { useEffect, useState } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';
import './sumsubsdk.css';
import { useNavigate } from 'react-router-dom';

const SumSubSDK = ({ accessToken, applicantEmail, applicantPhone }) => {

    const navigate = useNavigate()
    
    const [config, setConfig] = useState({
        lang: 'en',
        email: applicantEmail,
        phone: applicantPhone,
        theme: 'dark',
    });
    const options = {
        addViewportTag: true,
        adaptIframeHeight: true,
    }

    useEffect(() => {
        setConfig({
            lang: 'en',
            email: applicantEmail,
            phone: applicantPhone,
            theme: 'dark',
        });
    }, [applicantEmail, applicantPhone]);

    const accessTokenExpirationHandler = () => {
        console.log('Access token expired');
        navigate('/');

    };

    const messageHandler = (message, payload) => {
        console.log('Message from SDK:', message);
        if(message === 'idCheck.onApplicantStatusChanged'){
            console.log('status payload', payload)
        }
    };

    const errorHandler = (error) => {
        console.error('Error from SDK:', error);
    };

    return (
        <div className='sdk-container'>
            {accessToken ? (
                <SumsubWebSdk
                    accessToken={accessToken}
                    expirationHandler={accessTokenExpirationHandler}
                    config={config}
                    options={options}
                    onMessage={messageHandler}
                    onError={errorHandler}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SumSubSDK;
