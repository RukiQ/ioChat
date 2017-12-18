import React, { Component, PropTypes } from 'react';
import './app.scss';

const socket = io();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            message: '',
            messages:[],
            typer: '',  // 当前正在输入的人
        }

        socket.on('chat', (data) => {
            this.setState({ typer: '' }); // 当有消息更新时，清空“正在输入”提示
            this.updateMsg(data);
        });
        
        socket.on('typing', (data) => {
            this.setState({typer: data});
        });
    }

    // 发送新消息
    updateMsg(data) {
        let { messages } = this.state;
        messages.push(data);
        this.setState({ messages });
    }

    handleChange = (e, field) => {
        this.setState({
            [`${field}`]: e.target.value
        });
    }

    handleSubmit = (e) => {
        const { nickName, message } = this.state;

        if (message) {
            socket.emit('chat', {
                nickName,
                message
            });
        }

        this.setState({ message: '' });
    }
    handleKeyPress = (e) => {
        /**
         * 这边踩坑总结：要用 if...else...区分是否是回车，
         * 如果回车时也emit 'typing' 的话，相当于在emit 'chat' 之后又emit 'typing'，会让文字继续存在
         * 当然，可以把emit 'typing' 放在emit 'chat' 之前，但是其实回车时不需要 emit 'typing' 的
         */
        if (e.key == 'Enter') {
            this.handleSubmit();
        } else {
            const { nickName, message } = this.state;
            socket.emit('typing', nickName);
        }
    }

    render() {
        const { nickName, message, messages, typer } = this.state;

        return(
            <div>
                <ul id="messages">
                    {
                        messages.map((item, index) => <li className="message-content" key={index} style={{textAlign: item.nickName == nickName ? 'right' : ''}}><span style={{color: 'blueviolet'}}>{item.nickName}: </span>{item.message}</li>)
                    }
                </ul>
                {typer &&
                    <div className="tips">{typer} 正在输入...</div>
                }
                <div className="input-box">
                    <input className="nickName" type="text" placeholder="请输入昵称" value={nickName} onChange={(e) => this.handleChange(e, 'nickName')} />
                    <input id="m" type="text" placeholder="按回车提交" value={message} onKeyPress={this.handleKeyPress} onChange={(e) => this.handleChange(e, 'message')}/>
                    <button type="button" onClick={this.handleSubmit}>提交</button>
                </div>
            </div>
        )
    }
}