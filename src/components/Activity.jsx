import React from 'react';
import './components.css';

const Activity = ({ activity }) => {
  const username = activity.user && activity.user.username;
  const title = activity.title && activity.title.title;
  const type = activity.activityType;

  let actionText = '';
  let listName = '';

  if (type === 'favorite') {
    actionText = 'added';
    listName = 'favorites';
  } else if (type === 'watchLater') {
    actionText = 'added';
    listName = 'watch later';
  } else if (type === 'removeFavorited') {
    actionText = 'removed';
    listName = 'favorites';
  } else if (type === 'removeWatchLater') {
    actionText = 'removed';
    listName = 'watch later';
  }

  const date = new Date(activity.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <li className="activity-item">
      <p>
        <span className="activities-username">{username}</span> {actionText}{' '}
        <span className="activities-title">{title}</span> to{' '}
        <span className="activities-list">{listName}</span>{' '}
        <span className="activities-date">– {formattedDate}</span>
      </p>
    </li>
  );
};

export default Activity;
