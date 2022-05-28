import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import EditProfile from '../../components/EditProfile/EditProfile';
import MyProfile from '../../components/Profile/Profile';
import { setUser } from '../../redux/profile-slice';
import { localStorageActions } from '../../utils/localStorageActions';

const Profile: FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser, reloadProfileStatus, users } = useAppSelector((state) => state.profileSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser && !reloadProfileStatus) {
      const user = localStorageActions.getCurrentUser();
      dispatch(setUser(user));
    }

    if (currentUser && reloadProfileStatus) {
      const prevData = localStorageActions.getCurrentUser();
      localStorageActions.updateCurrentUser(prevData, currentUser);
    }
  }, [dispatch, currentUser, reloadProfileStatus, users]);

  return (
    <>
      {editMode ? (
        <EditProfile setEditMode={setEditMode} user={currentUser} />
      ) : (
        <MyProfile setEditMode={setEditMode} user={currentUser} />
      )}
    </>
  );
};

export default Profile;
