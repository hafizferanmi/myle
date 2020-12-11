import React, {Component} from 'react';
import {CircularProgress,} from '@material-ui/core';
import {connect} from 'react-redux';
import { actions } from '../../services';
import ContainerLoginPage from "./ContainerLoginPage";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdSteps from "./Steps/ThirdSteps";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_number: '',
            error: false,
            verification_code: '',
            error_verification_code: false,
            submitted: false,
        };

        this.change = this._change.bind(this);
        this.sendRequestCode = this._sendRequestCode.bind(this);
        this.agree = this._agree.bind(this);
        this.cancel = this._cancel.bind(this);
        this.verifyCode = this._verifyCode.bind(this);
        this.resendCode = this._resendCode.bind(this);
    }

    _change(event) {
        event.preventDefault();
        this.setState({
            error: false,
            error_verification_code: false,
            [event.target.name]: event.target.value
        })
    };

    _sendRequestCode() {
        this.props.sendRequestCode(this.state.phone_number);
    }

    canBeSubmitted() {
        return  this.state.phone_number.length > 0
    }

    _agree(){
        this.props.agree_verify();
    }

    _cancel(){
        this.props.cancel_verify();
    }

    _verifyCode () {
        this.props.verifyCode(this.state.phone_number, this.state.verification_code);
    }

    _resendCode () {
        this.setState({
            verification_code: '',
            error_verification_code: false,
        });
        this.props.sendRequestCode(this.state.phone_number);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.error!==this.props.error){
            this.setState({
                error: nextProps.error
            })
        }
       if(nextProps.error_verification_code!==this.props.error_verification_code){
           this.setState({
               error_verification_code: nextProps.error_verification_code
           })
       }
    }

    enterCredentials = (event) => {
        if ( event.keyCode === 13 && this.canBeSubmitted() && this.props.step==='step-1') {
            this.props.sendRequestCode(this.state.phone_number);
        }
    };
    enterConfirmation = (event) => {
        if ( event.keyCode === 13 && this.props.step==='step-2') {
            this.agree();
        }
    };
    enterCode = (event) => {
        if ( event.keyCode === 13 && this.props.step==='step-3') {
            this.props.verifyCode(this.state.phone_number, this.state.verification_code);
        }
    };

    render()
    {
        const {processing, step} = this.props;
        const {phone_number, verification_code, error, error_verification_code} = this.state;

        let credentials = () => {
            if(!processing && (step==='step-1')){
                document.addEventListener("keydown", this.enterCredentials, false);
                return (
                    <FirstStep phone_number={phone_number}
                               error={error}
                               changed={this.change}
                               send={this.sendRequestCode}
                               canBeSubmitted={() => this.canBeSubmitted()}
                    />
                );
            }
        };

        let confirmation = () => {
            if(!processing && (step==='step-2')){
                document.addEventListener("keydown", this.enterConfirmation, false);
                return (
                    <SecondStep agree={this.agree}
                                cancel={this.cancel}/>
                )
            }
        };

        let code = () => {
            if(!processing && (step==='step-3')){
                document.addEventListener("keydown", this.enterCode, false);
                return(
                       <ThirdSteps error={error_verification_code}
                                   changed={this.change}
                                   verification_code={verification_code}
                                   verifyCode={this.verifyCode}
                                   resendCode={this.resendCode}
                       />
                )
            }
        };

        return (
            <ContainerLoginPage>
                {processing && <CircularProgress style={{margin: '70px 140px'}}/>}
                {credentials()}
                {confirmation()}
                {code()}
            </ContainerLoginPage>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        sendRequestCode: (phone_number) => dispatch(actions.LoginActions.requestCode(phone_number)),
        cancel_verify: () => dispatch(actions.LoginActions.cancel_verify()),
        agree_verify: () => dispatch(actions.LoginActions.agree_verify()),
        verifyCode  : (phone_number, verification_code) => dispatch(actions.LoginActions.verifyCode(phone_number, verification_code)),
    }
}

function mapStateToProps({login})
{
    return {
        processing                      : login.processing,
        step                            : login.step,
        error                           : login.error,
        error_verification_code         : login.error_verification_code,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
