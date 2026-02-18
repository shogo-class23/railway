import React, { useState } from 'react';

interface StationInfo {
  name: string;
  type: 'boarding' | 'transfer' | 'alighting' | 'station';
  departureTime?: string;
  arrivalTime?: string;
  stayDuration?: string;
  travelDuration?: string;
  lineName?: string;
}

interface RouteResult {
  departureTime: string;
  arrivalTime: string;
  duration: string;
  totalFare: number;
  labels: string[]; // '早', '楽', '安'
  stations: StationInfo[];
}

const TransferPage: React.FC = () => {
  const [from, setFrom] = useState('');
  const [via, setVia] = useState('');
  const [to, setTo] = useState('');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [searchType, setSearchType] = useState('departure');
  const [results, setResults] = useState<RouteResult[] | null>(null);

  const searchRoutes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;

    // Dummy data generation
    const dummyResults: RouteResult[] = [
      {
        departureTime: '12:00',
        arrivalTime: '12:45',
        duration: '45分',
        totalFare: 650,
        labels: ['早', '楽'],
        stations: [
          { name: from, type: 'boarding', departureTime: '12:00', lineName: 'JR山手線', travelDuration: '15分' },
          { name: '中継駅A', type: 'station', arrivalTime: '12:15', departureTime: '12:15', travelDuration: '10分' },
          { name: via || '乗換駅B', type: 'transfer', arrivalTime: '12:25', departureTime: '12:35', stayDuration: '10分', lineName: '東京メトロ', travelDuration: '10分' },
          { name: to, type: 'alighting', arrivalTime: '12:45' },
        ]
      },
      {
        departureTime: '12:10',
        arrivalTime: '13:05',
        duration: '55分',
        totalFare: 480,
        labels: ['安'],
        stations: [
          { name: from, type: 'boarding', departureTime: '12:10', lineName: '私鉄急行', travelDuration: '20分' },
          { name: '途中駅X', type: 'station', arrivalTime: '12:30', departureTime: '12:30', travelDuration: '35分' },
          { name: to, type: 'alighting', arrivalTime: '13:05' },
        ]
      }
    ];
    setResults(dummyResults);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="transfer-page">
      <h1>乗換案内</h1>
      <section className="route-search-container">
        <form onSubmit={searchRoutes} className="search-form">
          <div className="input-group">
            <div className="field">
              <label>出発駅</label>
              <input type="text" placeholder="例: 東京" value={from} onChange={(e) => setFrom(e.target.value)} required />
            </div>
            <div className="field">
              <label>経由駅</label>
              <input type="text" placeholder="任意" value={via} onChange={(e) => setVia(e.target.value)} />
            </div>
            <div className="field">
              <label>到着駅</label>
              <input type="text" placeholder="例: 新宿" value={to} onChange={(e) => setTo(e.target.value)} required />
            </div>
          </div>

          <div className="time-group">
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {hours.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <span>時</span>
            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {minutes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <span>分</span>
            
            <div className="type-group">
              <label><input type="radio" name="searchType" value="departure" checked={searchType === 'departure'} onChange={(e) => setSearchType(e.target.value)} /> 出発</label>
              <label><input type="radio" name="searchType" value="arrival" checked={searchType === 'arrival'} onChange={(e) => setSearchType(e.target.value)} /> 到着</label>
              <label><input type="radio" name="searchType" value="first" checked={searchType === 'first'} onChange={(e) => setSearchType(e.target.value)} /> 始発</label>
              <label><input type="radio" name="searchType" value="last" checked={searchType === 'last'} onChange={(e) => setSearchType(e.target.value)} /> 終電</label>
            </div>
          </div>

          <button type="submit" className="search-btn">検索</button>
        </form>
      </section>

      {results && (
        <div className="results-container">
          {results.map((route, idx) => (
            <div key={idx} className="route-card">
              <div className="route-header">
                <div className="route-summary">
                  <span className="time-range">{route.departureTime} ～ {route.arrivalTime}</span>
                  <span className="duration">({route.duration})</span>
                  <span className="fare">運賃: {route.totalFare}円</span>
                </div>
                <div className="route-labels">
                  {route.labels.map(label => (
                    <span key={label} className={`label ${label}`}>{label}</span>
                  ))}
                </div>
              </div>
              
              <div className="station-list">
                {route.stations.map((st, sIdx) => (
                  <div key={sIdx} className={`station-item ${st.type}`}>
                    <div className="station-time">
                      {st.arrivalTime && <div className="arr-time">{st.arrivalTime}着</div>}
                      {st.departureTime && <div className="dep-time">{st.departureTime}発</div>}
                    </div>
                    <div className="station-marker">
                      <div className="dot"></div>
                      {sIdx < route.stations.length - 1 && <div className="line"></div>}
                    </div>
                    <div className="station-info">
                      <div className="station-name">{st.name}</div>
                      {st.lineName && <div className="line-info">{st.lineName} {st.travelDuration && `(${st.travelDuration})`}</div>}
                      {st.stayDuration && <div className="stay-info">乗換待ち {st.stayDuration}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransferPage;
