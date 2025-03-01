import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';
import FilterButtons from './components/FilterButtons/index';
import './App.css';

interface Team {
  name: string;
}

interface Match {
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: 'Scheduled' | 'Ongoing' | 'Finished';
}

const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Scheduled' | 'Ongoing' | 'Finished'>('All');

  const apiKey = import.meta.env.VITE_API_KEY_MATCHES;

  const fetchMatches = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(apiKey);
      if (response.data.ok) {
        setMatches(response.data.data.matches);
      } else {
        throw new Error();
      }
    } catch {
      setError(true);
      message.error('Ошибка: не удалось загрузить информацию');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const filteredMatches = filter === 'All' ? matches : matches.filter((match) => match.status === filter);

  return (
    <div className="match-tracker">
      <div className="header">
        <h2>Match Tracker</h2>
        <Button type="primary" loading={loading} onClick={fetchMatches} danger size="large">
          Update
        </Button>
      </div>

      <FilterButtons filter={filter} setFilter={setFilter} />

      {error && <div className="error">Ошибка: не удалось загрузить информацию</div>}

      <div className="matches">
        {filteredMatches.map((match) => (
          <div key={match.title} className="match-card">
            <div className="team">
              <img src="/illustrations_role.svg" alt="team-logo" className="team-logo" />
              {match.homeTeam.name}
            </div>
            <div className="match-info">
              <div className="score">
                {match.homeScore} : {match.awayScore}
              </div>
              <div className={`status ${match.status.toLowerCase()}`}>{match.status}</div>
            </div>
            <div className="team away">
              {match.awayTeam.name}
              <img src="/illustrations_role.svg" alt="team-logo" className="team-logo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;