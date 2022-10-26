import styles from './QuestionMark.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const QuestionMark = (props: { title: string }) => {
  return (
    <img
      className={cx('question-mark')}
      src={`/assets/svg/questionMark.svg`}
      alt="물음표"
      title={props.title}
    />
  );
};

