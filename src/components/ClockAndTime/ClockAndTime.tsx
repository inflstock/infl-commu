import styles from './ClockAndTime.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const ClockAndTime = (props: { time: string }) => {
  return (
    <div className={cx('time-box')}>
      <img className={cx('alarm')} src={`/assets/svg/clock.svg`} alt="알람" />
      <div className={cx('date')}>{props.time}</div>
    </div>
  );
};

