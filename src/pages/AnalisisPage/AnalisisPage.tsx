import classNames from 'classnames/bind';
import styles from './AnalisisPage.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { inflScoreRowData, rankingRowData } from 'services/enums/SampleRowData';
import { isUndefined } from 'lodash';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const cx = classNames.bind(styles);

export const AnalisisPage = () => {
  const { name, rank } = useParams();
  const navigate = useNavigate();
  const influencerData = rankingRowData.find((e) => e.name === name);

  const influencerScore = inflScoreRowData.find((e) => e.name === name);

  const numberFormat = (number: string) => {
    let resultNumber = parseFloat(number);

    if (number.length < 4) {
      return number;
    }
    else {
      while (resultNumber >= 1000) {
        resultNumber /= 1000
      }
      let value = resultNumber.toFixed(1).toString();
      if (value[value.length - 1] === '0') {
        value = value.substring(0, value.length - 2)
      }
      if (number.length < 7) {
        return value + 'K';
      } else if (number.length < 10) {
        return value + 'M';
      } else if (number.length < 13) {
        return value + 'B';
      } else if (number.length < 16) {
        return value + 'T';
      } else {
        return 'Out of Range'
      }
    }
  }

  const placeholder = '유튜브 채널명을 입력하십시오. (예: 침착맨)';

  const [searchKeyword, setSearchKeyword] = useState(placeholder);

  const callSearchApi = () => {
    alert('검색 기능은 아직 이용하실 수 없습니다.')
    //TODO: 검색
  }

  const inflText =
    influencerScore?.['인플루언서 등급'] === 'C'
      ? '괜찮은 채널입니다!'
      : influencerScore?.['인플루언서 등급'] === 'B'
        ? '훌륭한 채널입니다!'
        : influencerScore?.['인플루언서 등급'] === 'A'
          ? '매우 훌륭한 채널입니다!'
          : influencerScore?.['인플루언서 등급'] === 'S'
            ? '누구라도 부러워 할만한 채널입니다!'
            : influencerScore?.['인플루언서 등급'] === 'SS'
              ? '최고 수준의 채널입니다!!'
              : ''

  const radarData = {
    labels: ['영향력', '수익성', '잠재력', '선호도', '안정성', '활동성'],
    datasets: [
      {
        data: [
          influencerScore?.['영향력'],
          influencerScore?.['수익성'],
          influencerScore?.['잠재력'],
          influencerScore?.['선호도'],
          influencerScore?.['안정성'],
          influencerScore?.['활동성']
        ],
        backgroundColor: 'rgba(20, 122, 234, 0.3)',
        borderColor: 'rgba(20, 122, 234, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    elements: {
      point: {
        radius: 2,
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      r: {
        pointLabels: {
          color: '#147AEA',
        },
        angleLines: {
          display: false
        },
        suggestedMin: 2,
        suggestedMax: 10
      },
    },
    tooltips: {
      enabled: false, // 툴팁 제거
    },
  }
  useEffect(() => {
    if (name === 'cant' && rank === 'go') {
      alert('유튜버를 선택해주세요');
      navigate('/');
    } else if (isUndefined(influencerData) || isUndefined(influencerScore)) {
      alert('아직 분석되지 않은 유튜버입니다.');
      navigate('/');
    }
  }, []);


  return (<>
    <div className={cx('page-body')}>
      <div className={cx('childs')}>
        <div className={cx('infl-analisis-title')}>유튜버분석</div>
      </div>
      <div className={cx('childs')}>
        <input
          className={cx('searchChannel')}
          value={searchKeyword}
          onFocus={() => searchKeyword === placeholder ? setSearchKeyword('') : null}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onBlur={() => searchKeyword === '' ? setSearchKeyword(placeholder) : null}
          onKeyDown={(e) => e.key === 'Enter' ? callSearchApi() : null}
        />
        <div
          className={cx('searchButton')}
          onClick={() => callSearchApi()}
        >
          조회하기
        </div>
      </div>
      <div className={cx('childs')}>
        <div className={cx('infl-analisis-summary-box')}>
          <img className={cx('summary-image')}
            src={`/assets/sample/${influencerData?.category}_today_${rank}_${name}.jpg`}
            alt="thumbnail" />
          <div className={cx('summary-name')}>{name}</div>
          <div className={cx('summary-counts')}>
            <div className={cx('summary-counts-box')}>
              <img className={cx('summary-icons')} src={`/assets/svg/followers.svg`} alt="유튜브" />
              <div className={cx('summary-box')}>
                <div className={cx('summary-box-title')}>{numberFormat(influencerScore?.followers.toString() || '')}</div>
                <div className={cx('summary-box-content')}>Followers</div>
              </div>
            </div>
            <div className={cx('summary-counts-box')}>
              <img className={cx('summary-icons')} src={`/assets/svg/views.svg`} alt="유튜브" />
              <div className={cx('summary-box')}>
                <div className={cx('summary-box-title')}>{numberFormat(influencerScore?.views.toString() || '')}</div>
                <div className={cx('summary-box-content')}>Views</div>
              </div>
            </div>
            <div className={cx('summary-counts-box')}>
              <img className={cx('summary-icons')} src={`/assets/svg/videos.svg`} alt="유튜브" />
              <div className={cx('summary-box')}>
                <div className={cx('summary-box-title')}>{numberFormat(influencerScore?.videos.toString() || '')}</div>
                <div className={cx('summary-box-content')}>Videos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('childs')}>
        <div className={cx('infl-analisis-hexagon')}>
          <div>
            <Radar width={100} height={100} data={radarData} options={radarOptions} />
          </div>
        </div>
        <div className={cx('infl-analisis-score-box')}>
          <div className={cx('infl-analisis-score')}>
            <div className={cx('infl-analisis-score-title')}>
              인플스코어
            </div>
            <div className={cx('infl-analisis-score-content')}>
              <div className={cx('infl-analisis-score-content-1')}>{influencerScore?.['인플스코어']}<span>/60</span></div>
              <div className={cx('infl-analisis-score-content-2')}>{inflText}</div>
            </div>
          </div>
          <div className={cx('infl-analisis-score')}>
            <div className={cx('infl-analisis-score-title')}>
              인플랭킹
            </div>
            <div className={cx('infl-analisis-rank-content')}>
              <div className={cx('infl-analisis-rank-default-box', influencerScore?.['인플루언서 등급'] === 'C' ? 'selected' : '')}><span>C</span>RANK</div>
              <div className={cx('infl-analisis-rank-default-box', influencerScore?.['인플루언서 등급'] === 'B' ? 'selected' : '')}><span>B</span>RANK</div>
              <div className={cx('infl-analisis-rank-default-box', influencerScore?.['인플루언서 등급'] === 'A' ? 'selected' : '')}><span>A</span>RANK</div>
              <div className={cx('infl-analisis-rank-default-box', influencerScore?.['인플루언서 등급'] === 'S' ? 'selected' : '')}><span>S</span>RANK</div>
              <div className={cx('infl-analisis-rank-default-box', influencerScore?.['인플루언서 등급'] === 'SS' ? 'selected' : '')}><span>SS</span>RANK</div>
            </div>
          </div>
          <div className={cx('infl-analisis-score')}>
            <div className={cx('infl-analisis-score-title')}>
              유튜브 월 수익 예측
            </div>
            <div className={cx('infl-analisis-income-content')}>
              아직 준비중인 기능입니다
            </div>
          </div>
        </div>
      </div>
      <div className={cx('childs')}>
        <div className={cx('infl-analisis-comment-box')}>
          <div className={cx('comment-box-title')}>
            구독자 방명록(0)
          </div>
          <div className={cx('comment-box-comments')}>
            <div className={cx('comment-box-comment-writer')}>
              GUEST
            </div>
            <div className={cx('comment-box-comment')}>
              <div className={cx('comment-box-comment-content')}>
                준비중인 기능입니다.
              </div>
              <div className={cx('comment-box-comment-time')}>
                00:00
              </div>
            </div>
          </div>
          <div className={cx('comment-box-input-box')}>
            <input className={cx('comment-box-input')}>

            </input>
          </div>

        </div>

        <img
          onClick={() => window.open('/popup.html', 'popup', 'width=1000,height=600,location=no,status=no,scrollbars=yes')}
          className={cx('infl-analisis-banner')}
          src={`/assets/img/sampleBanner3.png`} alt="배너" />      </div>
    </div>
  </>);
};
