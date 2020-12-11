import Login from './Login';
import SelectCompany from "./SelectCompany";

export const login_config = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/login',
            component: Login,
        },
        {
            path     : '/select-company',
            component: SelectCompany,
        }
    ]
};
