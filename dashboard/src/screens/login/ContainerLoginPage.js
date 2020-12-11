import React, {Component} from 'react';
import {
    Card,
    CardContent,
    Typography,
    withStyles
} from '@material-ui/core';
import {FuseAnimate} from '../../@fuse';


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#FFFFFF',
        overflow: 'hidden',
    },
    blockImage: {
        display: 'flex',
        alignItems: 'center',
        width: "50%",
        background: '#F5F5F5'
    },
    image: {
        marginBottom: '50px',
        width: '120%',
    },
    block: {
        display: 'flex',
        alignItems: 'center',
        width: "50%",
        background: '#ffffff'
    },
    card: {
        boxShadow: 'none !important',
        padding: '0 120px',
        width: '360px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        boxShadow: 'none !important',

    },
    title: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '48px',
        color: '#212121',
        maxWidth: '360px',
        letterSpacing: '1.5px',
    }
};
class ContainerLoginPage extends Component {
    render(){
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.blockImage}>
                    <img className={this.props.classes.image}
                         src="assets/images/logos/illus welcome.png" alt="logo"/>
                </div>
                <div className={this.props.classes.block}>
                    <FuseAnimate animation={{translateX: [0, '100%']}}>
                        <Card className={this.props.classes.cardContent}>
                            <CardContent className={this.props.classes.card}>
                                <Typography gutterBottom variant="h5" component="h2" style={styles.title}>
                                    Welcome to Myle Business!
                                </Typography>

                                {this.props.children}

                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContainerLoginPage);
