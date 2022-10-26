import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionMark } from 'components/QuestionMark';
import { ClockAndTime } from 'components/ClockAndTime';
import { inflScoreRowData, keywordRowData, newsRowData, rankingRowData } from 'services/enums/SampleRowData';
import ReactWordCloud from 'react-wordcloud'
const cx = classNames.bind(styles);

export const MainPage = () => {
  const placeholder = '유튜브 채널명을 입력하십시오. (예: 침착맨)';

  const [searchKeyword, setSearchKeyword] = useState(placeholder);

  const [selectedOption, setSelectedOption] = useState('유튜버');

  const [selectedType, setSelectedType] = useState(0);
  const navigate = useNavigate();

  const inflTypes = [
    { src: '/assets/img/game.png', title: '게임' },
    { src: '/assets/img/music.png', title: '음악' },
    { src: '/assets/img/eat.png', title: '먹방' },
    { src: '/assets/img/vlog.png', title: '브이로그' },
    { src: '/assets/img/lookbook.png', title: '룩북' },
    { src: '/assets/img/health.png', title: '헬스' },
    { src: '/assets/img/makeup.png', title: '메이크업' },
    { src: '/assets/img/golf.png', title: '골프' },
  ]

  const myKeyword = keywordRowData
    .filter((e) => e.category === inflTypes[selectedType].title)
    .map((item) => {
      return {
        text: item.keyword, value: item.value
      }
    })

  const callSearchApi = () => {
    alert('검색 기능은 아직 이용하실 수 없습니다.')
    //TODO: 검색
  }

  const getDate = (date: string) => {
    const resultDate = new Date(date);
    const year = resultDate.getFullYear();
    const month = resultDate.getMonth() + 1;
    const day = resultDate.getDate();
    const weekday = resultDate.getDay();
    const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토']
    return year + '년 ' + month + '월 ' + day + '일 (' + dayOfTheWeek[weekday] + ') 10:00'
  }

  return (<>
    <div className={cx('page-header')}>
      <div className={cx('header-title')}>10초만에 보는 유튜브 트렌드, 인플트렌드!</div>
      <div className={cx('header-input')}>
        <input
          value={searchKeyword}
          onFocus={() => searchKeyword === placeholder ? setSearchKeyword('') : null}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onBlur={() => searchKeyword === '' ? setSearchKeyword(placeholder) : null}
          onKeyDown={(e) => e.key === 'Enter' ? callSearchApi() : null}
        />
        <div
          onClick={() => callSearchApi()}
        >
          <img src={`/assets/img/searchImage.png`} alt="검색 버튼" />
        </div>
      </div>
      <div className={cx('header-tags')}>#인기 유튜버 #인기 키워드 #실시간 구독자 채팅 #SNS 빅데이터 플랫폼</div>
    </div>
    <div className={cx('page-body')}>
      <div className={cx('childs')}>
        <div className={cx('body-infl-trend')}>
          <div className={cx('infl-trend-title')}>
            <div className={cx('infl-trend-title-subject')}>인플트렌드</div>
            <QuestionMark title={'SNS 플랫폼의 카테고리 별 트렌드 데이터 분석 솔루션입니다.'} />
            <div className={cx('select-box')}>
              <img className={cx('youtube-mark')} src={`/assets/img/youtube.png`} alt="유튜브" />
              <select className={cx('select-options')} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value={'유튜버'}>유튜버</option>
                <option value={'키워드'}>키워드</option>
              </select>
            </div>
            <ClockAndTime time={getDate(inflScoreRowData[0].crawled_date)} />
          </div>
          <div className={cx('infl-trend-types')}>
            {
              inflTypes.map((item, index) => {
                return (
                  <div
                    key={`infl-trend-type-` + index}
                    className={cx('infl-trend-type', selectedType === index ? 'selected' : '')}
                    onClick={() => setSelectedType(index)}
                  >
                    <img className={cx('infl-trend-image')} src={item.src} alt="알람" />
                    <div className={cx('infl-trend-text')}>{item.title}</div>
                  </div>
                )
              })
            }
          </div>
          <div className={cx('infl-trend-keyword-cloud', selectedOption === '유튜버' ? 'noDisplay' : '')}>
            <ReactWordCloud
              options={{
                colors: ["#E004fe", "#2ca02c", "#D62728"],
                fontFamily: 'impact',
                fontSizes: [40, 90],
                rotations: 0,
                padding: 5
              }}
              words={myKeyword} />
          </div>
          <div className={cx('infl-trend-ranking-circle', selectedOption === '키워드' ? 'noDisplay' : '')}>
            {
              rankingRowData.filter((e) => e.category === inflTypes[selectedType].title).map((item, index) => {
                if (index > 9) return null
                else {
                  return (
                    <div className={cx('infl-trend-ranked-influencer')}>
                      <div className={cx('is-ranker')}>{index + 1}</div>
                      <img
                        onClick={() => navigate('/analisis/' + (item.name) + '/' + (index))}
                        className={cx('ranked-influencer-image')}
                        src={`/assets/sample/${item.category}_today_${index}_${item.name}.jpg`}
                        alt="인플루언서" />
                      <div className={cx('ranked-influencer-name')}>{item.name}</div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
        <div className={cx('body-infl-ranking')}>
          <div className={cx('infl-ranking-title')}>오늘의 {selectedOption === '유튜버' ? '인플루언서' : '키워드'} 순위 TOP 10</div>
          <div className={cx('infl-ranking-sub')}>
            <div className={cx('infl-ranking-type')}>{inflTypes[selectedType].title}</div>
            <div className={cx('infl-ranking-date')}>2022년 10월 7일 (금)</div>
          </div>
          {
            keywordRowData.filter((e) => e.category === inflTypes[selectedType].title).map((item, index) => {
              if (index > 9) return null
              else {
                return (
                  <div
                    key={`infl-ranking-content-` + index}
                    style={{ cursor: `default` }}
                    className={cx('infl-ranking-content', selectedOption === '유튜버' ? 'noDisplay' : '')}>
                    <div className={cx('infl-ranking-name')}>{(index + 1) + `. ` + item.keyword}</div>
                    <div className={cx('infl-ranking-subscriber')}>{item.value}</div>
                    <img className={cx('youtube-mark-top')} src={`/assets/svg/blueheart.svg`} alt="유튜브" />
                  </div>
                )
              }
            }
            )
          }
          {
            rankingRowData.filter((e) => e.category === inflTypes[selectedType].title).map((item, index) => {
              if (index > 9) return null
              else {
                return (
                  <div
                    onClick={() => navigate('/analisis/' + (item.name) + '/' + (index))}
                    key={`infl-ranking-content-` + index}
                    className={cx('infl-ranking-content', selectedOption === '키워드' ? 'noDisplay' : '')}>
                    <div className={cx('infl-ranking-name')}>{(index + 1) + `. ` + item.name}</div>
                    <div className={cx('infl-ranking-subscriber')}>{item.subscriber}</div>
                    <img className={cx('youtube-mark-top')} src={`/assets/img/youtube.png`} alt="유튜브" />
                  </div>
                )
              }
            }
            )
          }
        </div>
      </div>
      <div className={cx('childs')}>
        <img className={cx('banner')} src={`/assets/img/sampleBanner1.png`} alt="배너" />
        <img className={cx('banner')} src={`/assets/img/sampleBanner2.png`} alt="배너" />
      </div>
      <div className={cx('childs')}>
        <div className={cx('body-infl-news')}>
          <div className={cx('infl-trend-title')}>
            <div className={cx('infl-trend-title-subject')}>주요 인플뉴스</div>
            <QuestionMark title={'인플스톡의 알고리즘을 기반으로 자동 수집된 기사입니다.'} />
            <ClockAndTime time={getDate(inflScoreRowData[0].crawled_date)} />
          </div>
          <div className={cx('infl-news-box')}>
            <div onClick={() => window.location.href = newsRowData[0].url} className={cx('infl-news-main')}>
              <img className={cx('news-main-image')} src={`/assets/img/sampleNews.jpg`} alt="샘플" />
              <div className={cx('news-main-title')}>{newsRowData[0].headline}</div>
              <div className={cx('news-main-content')}>{newsRowData[0].headline}</div>
            </div>
            <div className={cx('infl-news-sub')}>
              {
                newsRowData.map((item, index) => {
                  if (index > 7 || index === 0) return null
                  else {
                    return (
                      <div onClick={() => window.location.href = item.url} className={cx('news-sub-row')}>
                        <div className={cx('news-sub-title')}>{item.headline}</div>
                        <div className={cx('news-sub-time')}>{item.post_date}</div>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        <img
          onClick={() => window.open('/popup.html', 'popup', 'width=1000,height=600,location=no,status=no,scrollbars=yes')}
          className={cx('body-infl-banner')}
          src={`/assets/img/sampleBanner3.png`} alt="배너" />
      </div>
    </div>
  </>);
};
