import React, {useState, useEffect, useRef} from 'react';
import {db} from '../firebase';
import SendMsg from './SendMsg';

/**
 * Компонент, который отвечает за показ сообщений в чате
 * @returns разметку чата
 */
function Chat() {
    const [messages, setMessages] = useState([]);
    
    /* 
        используем хук useEffect, чтобы получить сообщения в порядке их создания (новые внизу)
        хук сработает один раз при загрузке страницы, но благодаря firebase будет обновляться при каждом изменении
        если бы мы не использовали firebase, необходимо было бы передать в хук вторым аргументом [messages] 
    */
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        })
    }, []);

    const messagesEndRef = useRef(null); // используем useRef, чтобы не перерисовывать страницу
    /**
     * автоматически прокручивает скроллбар к новому сообщению, когда оно добавляется в чат
     */
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    /* 
        когда добавляется новое сообщение, срабатывает функция scrollToBottom, которая в свою очередь находит div,
        messagesEndRef и прокручивает страницу к нему.
    */
    useEffect(scrollToBottom, [messages]); 
    
    return (
        <div>
            <div className="chat-block">
                <div className="messages">
                    {messages.map(({id, text, photoURL}) => (
                        <div className="message-block" key={id}>
                            <img className="user-img" src={photoURL} alt="" />
                            <p className="message-text">{text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <SendMsg />
            </div>
        </div>
    )
}

export default Chat;
