import './css/styles.css';
import Chat from './components/Chat';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.js';

/**
 * Этот компонент в зависимости от того, авторизован пользователь или нет, возвращает приветственный блок или же блок с чатом
 * @returns разметку страницы
 */
function App() {
  const [user] = useAuthState(auth); // true или false 

  return (
    <>
       <header className="header">
        <h1 className="title"><i className="fab fa-telegram-plane msg-icon"></i>Мессенджер</h1>
        {user ? <LogOut /> : <LogIn />}
      </header>
      <main>
        {user ? <Chat /> : <div className="welcome-block">Для того, чтобы начать чат, войдите в свой аккаунт, нажав "Войти" в верхнем правом углу экрана</div>}
      </main>
      <footer>&copy; Copyright 2021</footer>
    </>
  );
}

export default App;
