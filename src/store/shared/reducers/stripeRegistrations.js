import { STRIPE_REGISTRATIONS, CHECK_STRIPE_REGISTRATION } from '../actions/stripeRegistration';

const initalState = {
    stripeURL: null,
    loading: false,
    cardDetails: null,
    dashboardURL: null
};

export default (state = { ...initalState }, action) => {
    switch (action.type) {
        case STRIPE_REGISTRATIONS.start:
            return {
                ...state,
                loading: true,
            };

        case CHECK_STRIPE_REGISTRATION.start:
            return {
                ...state,
                loading: true,
            };

        case STRIPE_REGISTRATIONS.end:
            return {
                ...state,
                loading: false,
            };

        case CHECK_STRIPE_REGISTRATION.end:
            return {
                ...state,
                loading: false,
            };

        case STRIPE_REGISTRATIONS.success:
            return {
                ...state,
                loading: false,
                stripeURL: action.data,
            };

        case CHECK_STRIPE_REGISTRATION.success:
            return {
                ...state,
                loading: false,
                cardDetails: action.data.card_details,
                dashboardURL: action.data.stripe_details.url,
            };

        case CHECK_STRIPE_REGISTRATION.failed:
            return {
                ...state,
                loading: false,
            };

        case STRIPE_REGISTRATIONS.failed:
            return {
                ...state,
                loading: false,
            };


        default:
            return state;
    }
};
