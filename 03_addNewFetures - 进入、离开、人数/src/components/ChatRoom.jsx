import React, { Component, PropTypes } from 'react';
import './chatroom.scss';

class ChatRoom extends Component {
    // username 和 userId 必须从登陆页传进来，不需要通过服务器获得
    // 自身的状态不需要经过服务器，只有需要获取别的客户端的信息时，才需要服务器转播
    static defaultProps = {
        username: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            typer: '',  // 当前正在输入的人
            numUsers: 0,
            statusList: []
        };

        this.socket = props.socket;
        this.listen(this.socket);
    }

    listen(socket) {
        socket.on('login', ({numUsers}) => {
            this.setState({
                numUsers
            });
        });

        socket.on('user joind', (data) => {
            this.updateStatusList('joind', data);
        });

        socket.on('user left', (data) => {
            this.updateStatusList('left', data);
        });

        socket.on('chat', (data) => {
            this.setState({ typer: '' }); // 当有消息更新时，清空“正在输入”提示
            this.updateMsg(data);
        });

        socket.on('typing', (data) => {
            this.setState({ typer: data.username });
        });
        
        socket.on('stop typing', () => {
            this.setState({typer: ''});
        });
    }

    generateTime() {
        let hour = new Date().getHours(),
            minute = new Date().getMinutes(),
            second = new Date().getSeconds();
        hour = (hour==0) ? '00' : hour;
        minute = (minute<10) ? '0' + minute : minute;
        return hour + ':' + minute + ":" + second;
    }

    updateStatusList(status, data) {
        const { statusList } = this.state;
        const { username, numUsers } = data;

        statusList.push({
            username,
            status,
            time: this.generateTime()
        });

        this.setState({
            statusList,
            numUsers
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
        const { message } = this.state;

        if (message) {
            this.socket.emit('chat', message);
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
            this.socket.emit('typing');

            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.socket.emit('stop typing');
            }, 2000);
        }
    }

    render() {
        const { username } = this.props;
        const { message, messages, typer, numUsers, statusList, joiner, lefter } = this.state;

        return (
            <div className="chatRoom">
                <div className="chatZone">
                    <h2 className="userName">{username}</h2>
                    <ul id="messages">
                        {
                            messages.map((item, index) => {
                                let isSelf = item.username == username;

                                return <li className="message-content" key={index} style={{ textAlign: isSelf ? 'right' : '' }}>
                                            <b style={{ color: isSelf ? 'blueviolet' : '#2B39E2' }}>{item.username}&nbsp;&nbsp;</b>
                                            {item.message}
                                        </li>;
                            })
                        }
                    </ul>
                    {typer &&
                        <div className="tips">{typer} 正在输入...</div>
                    }
                    <div className="input-box">
                        <input id="m" type="text" placeholder="按回车提交" value={message} onKeyPress={this.handleKeyPress} onChange={(e) => this.handleChange(e, 'message')} />
                        <button type="button" onClick={this.handleSubmit}>提交</button>
                    </div>
                </div>
                <div className="userList">
                    <div className="userNum">当前用户数：{numUsers}</div>
                    <hr />
                    {
                        statusList.map((item, index) => <div key={Math.random(0, 1000)}>{item.time}&nbsp;&nbsp;{item.username}&nbsp;{item.status == 'joind' ? '进入' : '离开'}了房间</div>)
                    }
                </div>
            </div>
        )
    }
}

export default ChatRoom;