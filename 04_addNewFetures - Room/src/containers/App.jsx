import React, { Component, PropTypes } from 'react';
import './app.scss';
import io from 'socket.io-client';

// const socket = io();
const socket = io('/mySpace');

import ChatRoom from '../components/ChatRoom';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            logged: false
        };

        socket.on('connect', () => {
            console.log('socket.id:', socket.id);
        });
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value });
    }
    handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            this.handleLogin();
        }
    }

    // 随机生成一个用户id
    generateUid() {
        return new Date().getTime()+""+Math.floor(Math.random()*899+100);
    }

    handleLogin = () => {
        let { username, logged } = this.state;

        if (!username) {
            username = '游客'+ this.generateUid();
        }

        socket.emit('login', username);
        this.setState({
            logged: true
        });
    }

    render() {
        const { username, logged } = this.state;

        const roomProps = {
            socket,
            username
        }

        return (
            <div>
                {logged ?
                    <ChatRoom {...roomProps} />
                    :
                    <div className="login-wrapper">
                        <h2>登 陆</h2>
                        <div className="input">
                            <input type="text"
                                placeholder="请输入用户名"
                                value={username}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress} />
                        </div>
                        <div className="submit">
                            <button type="button" onClick={this.handleLogin} >提交</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}