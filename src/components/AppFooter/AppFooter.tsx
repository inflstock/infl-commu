import classNames from 'classnames/bind';
import styles from './AppFooter.module.scss';

const cx = classNames.bind(styles);

export const AppFooter = () => {
  return (
    <footer className={cx('app-footer')}>
      <div className={cx('footer-logo-section')}>
        <img src={`infltrendLogo.png`} alt="로고" />
      </div>
      <div className={cx('fotter-text-section')}>
        <p>(주)인플스톡 | 경기 수원시 영통구 경기대학교 산학협력단 408호 | 대표 강동훈 | 사업자등록번호 681-81-02558</p>
        <p>E-MAIL | INFLSTOCK@NAVER.COM</p>
        <p>
          <img src={`assets/img/instagram.png`} alt="로고" />
          <img src={`assets/img/facebook.png`} alt="로고" />
          <img src={`assets/img/youtube.png`} alt="로고" />
          <img src={`assets/img/kakao.png`} alt="로고" />
          <img src={`assets/img/naver.png`} alt="로고" />
        </p>
        <p><span>이용약관</span><span>개인정보처리방침</span></p>
        <p>COPYRIGHT 2022 INFLSTOCK INC. ALL RIGHT RESERVED</p>
      </div>
    </footer>
  );
};
