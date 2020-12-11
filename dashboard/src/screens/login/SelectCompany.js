import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { actions } from '../../services';
import ContainerLoginPage from "./ContainerLoginPage";
import Button from "../../components/Button/Button";


const styles = {
    description: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px',
        color: ' rgba(0, 0, 0, 0.87)',
        margin: '48px 0px 26px 1px'
    },
    btn_container:{
        display: "flex",
        justifyContent: 'space-between',
        width: '261px',
    }
};

class SelectCompany extends PureComponent {

    constructor(props) {
        super(props);
        this.agree = this._agree.bind(this);
    }

    _agree(){
        this.props.agree_verify();
    }

    selectCompany = (company) => {
        this.props.selectCompany(company);
    };

    render()
    {
        const {companies} = this.props;

        return (
            <ContainerLoginPage>
                <h3 style={styles.description}>Please select a company:</h3>
                <div style={styles.btn_container}>
                    {companies && companies.map((company) => {
                        return (
                            <Button key={company.id}
                                    color={'blue'}
                                    width={'120px'}
                                    textTransform={false}
                                    clicked={_ => this.selectCompany(company)}
                            >
                                {company.name}
                            </Button>
                        )
                    })}
                </div>

            </ContainerLoginPage>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        selectCompany  : (company) => dispatch(actions.AppActions.selectCompany(company, true)),
    }
}

function mapStateToProps({login})
{
    return {
        companies                       : login.companies,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompany);
