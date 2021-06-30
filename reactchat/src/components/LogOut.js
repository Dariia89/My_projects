import { auth } from '../firebase';

/**
 * компонент для выхода из акканута пользователя на сайте
 * @returns разметку кнопки выхода из аккаунта
 */
function LogOut() {
    const signOut = () => auth.signOut();

    return (
        <div>
            <button className="button button-log" onClick={signOut}>Выйти <i className="fas fa-sign-out-alt"></i></button>
        </div>
    )
}

export default LogOut;
