import React from 'react';
import './ui.css';

interface FilterButtonsProps {
  filter: 'All' | 'Scheduled' | 'Ongoing' | 'Finished';
  setFilter: (filter: 'All' | 'Scheduled' | 'Ongoing' | 'Finished') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = (props) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => props.setFilter('All')}
        className={props.filter === 'All' ? 'active-filter' : ''}
      >
        Все
      </button>
      <button
        onClick={() => props.setFilter('Scheduled')}
        className={props.filter === 'Scheduled' ? 'active-filter' : ''}
      >
        Запланированные
      </button>
      <button
        onClick={() => props.setFilter('Ongoing')}
        className={props.filter === 'Ongoing' ? 'active-filter' : ''}
      >
        В процессе
      </button>
      <button
        onClick={() => props.setFilter('Finished')}
        className={props.filter === 'Finished' ? 'active-filter' : ''}
      >
        Завершенные
      </button>
    </div>
  );
};

export default FilterButtons;
