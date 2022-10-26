import styles from './AppHeader.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const menus = [
  { text: '인플트렌드', name: 'inflTrend', to: '/' },
  { text: '유튜버 분석', name: 'analisis', to: '/analisis/cant/go' },
]

export const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={cx('app-header')}>
      <div className={cx('header-logo-section')}>
        <img onClick={() => navigate('/')} src={`infltrendLogo.png`} alt="로고" />
      </div>
      <div className={cx('header-menu-section')}>
        <div>
          {menus.map((menu: any, menuKey: number) => (
            <Link
              to={menu.to}
              key={`APP_MENU_KEY_${menuKey}`}
              className={window.location.pathname.split('/')[1] === menu.to.split('/')[1] ? cx('selected') : ''}>
              {menu.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

