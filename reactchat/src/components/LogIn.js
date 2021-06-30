import React from 'react';
import firebase from 'firebase';
import { auth } from '../firebase';

/**
 * компонент для авторизации пользователя на сайте через google аккаунт
 * @returns разметку для кнопки входа на сайт
 */
function LogIn() {

    /**
     * Эта функция авторизует пользователя через его google аккаунт с помощью всплывающего окна
     */
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <div>
            <button className="button button-log" onClick={signInWithGoogle}>Войти <i className="fas fa-sign-in-alt"></i></button>
        </div>
    )
}

export default LogIn;
