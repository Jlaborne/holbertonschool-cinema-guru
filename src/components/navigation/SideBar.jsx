import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Activity from '../Activity';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFolder, faStar } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    if (pageName === 'Home') {
      navigate('/home');
    } else if (pageName === 'Favorites') {
      navigate('/favorites');
    } else if (pageName === 'Watch Later') {
      navigate('/watchlater');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('TOKEN:', token);
    if (!token) return;

    axios
      .get('http://localhost:8000/api/activity', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setActivities(res.data))
      .catch((err) => console.error('Failed to fetch activities:', err));
  }, []);
  return (
    <nav
      className={`sidebar ${small ? 'small' : ''}`}
      onMouseEnter={() => setSmall(false)}
      onMouseLeave={() => setSmall(true)}
    >
      <ul className="nav-links">
        <li
          onClick={() => setPage('Home')}
          className={selected === 'Home' ? 'active' : ''}
        >
          <FontAwesomeIcon icon={faFolder} />
          {!small && <span className="label">Home</span>}
        </li>
        <li
          onClick={() => setPage('Favorites')}
          className={selected === 'Favorites' ? 'active' : ''}
        >
          <FontAwesomeIcon icon={faStar} />
          {!small && <span className="label">Favorites</span>}
        </li>
        <li
          onClick={() => setPage('Watch Later')}
          className={selected === 'Watch Later' ? 'active' : ''}
        >
          <FontAwesomeIcon icon={faClock} />
          {!small && <span className="label">Watch Later</span>}
        </li>
      </ul>

      {!small && (
        <div className="activities-container">
          <h4 className="activity-title">
            <span className="label">Latest Activities</span>
          </h4>
          <ul className="activity-list">
            {activities.slice(0, 10).map((activity) => (
              <Activity key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default SideBar;
