import { FC } from 'react';
import s from './Welcome.module.scss';

const Welcome: FC = () => {
  return (
    <div className={s.welcomePage}>
      <section className={s.appInfo}>
        <div className={s.container}>
          <div className={s.textWrapper}>
            <h1 className={s.title}>Trello clone</h1>
            <p className={s.description}>
              Trello clone will help you organize your team&apos;s work. The user can set tasks,
              complete tasks, view tasks, delete own tasks, be responsible for other people&apos;s
              tasks
            </p>
          </div>
          <div className={s.teamSection}>
            <div className={s.card}>
              <p>About command</p>
            </div>
          </div>
        </div>
      </section>
      <section className={s.appDescription}>
        <div className={`${s.container} ${s.descriptionContainer}`}>
          <div className={s.image}></div>
          <div>
            <ul>
              <li className={s.item}>Add boards, columns and tasks</li>
              <li className={s.item}>Manage your projects</li>
              <li className={s.item}>Planning to work on a project</li>
              <li className={s.item}>Develop team spirit</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
