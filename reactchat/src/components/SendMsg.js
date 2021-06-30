import React, { useState } from 'react';
import firebase from 'firebase';
import { db, auth } from '../firebase.js';


/**
 * компонент для отправки сообщения, регулирует процесс добавления сообщения в базу данных
 * @returns форму ввода сообщения 
 */
function SendMsg() {
    const [msg, setMsg] = useState('');
    
    /**
     * эта функция следит за изменениями в input и устанавливает его value переменной msg
     * @param {*} e событие
     */
    const handleChange = e => {
        setMsg(e.target.value);
    }

    /**
     * Эта функция добавляет сообщение в базу данных
     * @param {*} e событие
     */
    async function sendMessage(e) {
        e.preventDefault(); // отменяем дефолтное поведение, чтобы страница не обновлялась
        const {uid, photoURL} = auth.currentUser; // деструктурируем объект текущего пользователя (вычленяем айди юзера и фото)

        await db.collection('messages').add({  //добавляем в коллецию сообщений следующий объект
            text: msg, // сообщение, введенное в input
            photoURL, // фото пользователя
            uid, // айди пользователя
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // время создания сообщения
        });

        setMsg(''); // очищаем поле ввода, устанавливая значение msg как пустую строку
    }

    return (
        <div>
           <form onSubmit={sendMessage}>
               <input type="text" value={msg} onChange={handleChange} placeholder="Ваше сообщение..." />
               <button className="button button-send" type="submit">Отправить</button>
           </form> 
        </div>
    )
}

export default SendMsg;
