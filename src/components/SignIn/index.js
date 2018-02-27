import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Form, Item, Button, Input } from 'native-base';
import styles from '../styles';

const SignIn = (props) => {

    handleSignIn = () => {
        const { onSignIn } = props;
        onSignIn();
    }

    return (
        <Container style={styles.container}>
            <Content>
                <Form>
                    <Button
                        primary
                        style={styles.button}
                        onPress={this.handleSignIn}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default SignIn;