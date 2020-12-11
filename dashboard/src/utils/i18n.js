import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        test: 'testing A',
        translation: {
            'test': {
                'test': 'testing A',
            },
            'login':{
                'log_in' : 'Log in',
                'verify_code':'Verify code',
                'resend_code':'Resend code',
                'verification_code': 'Verification code',
                'email':'Email',
                'password':'Password',
                'forgot_password':'Forgot password',
                'remember_me':'Remember me'
            },
            'rides':{
                'title':'Rides',
                'statuses': {
                    'pending':'Pending',
                    'assigned':'Assigned',
                    'accepted':'Accepted',
                    'arriving':'On Location',
                    'in_progress':'In progress',
                    'finished':'Finished',
                    'user_canceled':'Rider',
                    'driver_canceled':'Driver',
                    'company_canceled':'Company',
                    'no_drivers_available': 'No Drivers Available'
                },
                'types':{
                    'taxi_regular': 'Taxi Regular',
                    'taxi_wav': 'Taxi WAV',
                    'taxi_plus': 'Taxi Plus',
                    'black_regular': 'Black Regular',
                    'black_wav':'Black WAV',
                    'black_plus':'Black Plus'
                }
            },
            'drivers': {
                'title':'Drivers',
                'statuses': {
                    'all': 'All',
                    'active': 'Active',
                    'disabled': 'Disabled',
                    'waiting_for_approval': 'Waiting Approval'
                }
            },
            'payouts': {
                'title':'Payouts',
                'statuses': {
                    'pending':'Pending',
                    'succeeded':'Done',
                    'failed':'Failed'
                },
            },
            'routes': {
                'title':'Routes',
            },
            'settings': {
                'title':'Settings',
                'service-fees': {
                    'title':'Service Fees',
                }
            },
            'cars': {
                'title':'Cars',
            },
            'clients': {
                'title':'Clients',
            },
            'billing': {
                'title':'Billing',
                'statuses': {
                    'finished':'Finished',
                    'user_canceled':'User canceled',
                    'driver_canceled':'Driver canceled',
                    'company_canceled':'Company canceled'
                },
            },
            'documents': {
                'title':'Documents',
                'statuses': {
                    '': 'All',
                    'pending': 'Pending',
                    'valid': 'Valid',
                    'invalid': 'Invalid'
                }
            }
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',

        //keySeparator: false, // we do not use keys in form messages.welcome
        debug: true,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
