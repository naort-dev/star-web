
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const STRIPE_REGISTRATIONS = {
    start: 'stripeRegistrations/REQUEST',
    end: 'stripeRegistrations/REQUEST_END',
    success: 'stripeRegistrations/REQUEST_SUCCESS',
    failed: 'stripeRegistrations/REQUEST_FAILED',
};

export const CHECK_STRIPE_REGISTRATION = {
    start: 'checkStripeRegistrations/REQUEST',
    end: 'checkStripeRegistrations/REQUEST_END',
    success: 'checkStripeRegistrations/REQUEST_SUCCESS',
    failed: 'checkSstripeRegistrations/REQUEST_FAILED',
};



export const stripeRegistrationStart = () => ({
    type: STRIPE_REGISTRATIONS.start,
});

export const stripeRegistrationEnd = () => ({
    type: STRIPE_REGISTRATIONS.end,
});

export const stripeRegistrationSuccess = (data) => {

    return (
        {
            type: STRIPE_REGISTRATIONS.success,
            data,
        });
};

export const stripeRegistrationFailed = error => ({
    type: STRIPE_REGISTRATIONS.failed,
    error,
});

export const checkStripeRegistrationStart = () => ({
    type: CHECK_STRIPE_REGISTRATION.start,
});

export const checkStripeRegistrationEnd = () => ({
    type: CHECK_STRIPE_REGISTRATION.end,
});

export const checkStripeRegistrationSuccess = (data) => {
    return (
        {
            type: CHECK_STRIPE_REGISTRATION.success,
            data,
        });
};

export const checkStripeRegistrationFailed = error => ({
    type: CHECK_STRIPE_REGISTRATION.failed,
    error,
});


export const fetchURL = () => (dispatch, getState) => {
    const { authentication_token: authToken } = getState().session.auth_token;
    dispatch(stripeRegistrationStart());
    return fetch(Api.stripeRegistration, {
        headers: {
            'Authorization': `token ${authToken}`,
        },
    }).then((resp) => {
        if (resp.data && resp.data.success) {
            dispatch(stripeRegistrationSuccess(resp.data.data.stripe_url));
            dispatch(stripeRegistrationEnd());
            return resp;
        } else {
            dispatch(stripeRegistrationEnd());
        }
    }).catch((exception) => {
        dispatch(stripeRegistrationEnd());
        dispatch(stripeRegistrationFailed(exception));
    });
};


export const checkStripe = () => (dispatch, getState) => {
    const { authentication_token: authToken } = getState().session.auth_token;
    dispatch(checkStripeRegistrationStart());
    return fetch(Api.checkStripe, {
        headers: {
            'Authorization': `token ${authToken}`,
        },
    }).then((resp) => {
        if (resp.data && resp.data.success) {
            dispatch(checkStripeRegistrationSuccess(resp.data.data));
            dispatch(checkStripeRegistrationEnd());
            return resp;
        } else {
            dispatch(checkStripeRegistrationEnd());
        }
    }).catch((exception) => {
        dispatch(checkStripeRegistrationEnd());
        dispatch(checkStripeRegistrationFailed(exception));
    });
}


