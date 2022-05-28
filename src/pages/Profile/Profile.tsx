import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import EditProfile from '../../components/ProfileEdit/Edit-profile';
import MyProfile from '../../components/ProfileMy/My-profile';
import saveId from '../../shared/id-save/id-save';
import { getUser } from '../../redux/edit-profile-slice';

const Profile: FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { user } = useAppSelector((state) => state.usersSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(saveId.getUserId() as string));
  }, [dispatch]);

  return (
    <>
      {editMode ? (
        <EditProfile setEditMode={setEditMode} user={user} />
      ) : (
        <MyProfile setEditMode={setEditMode} user={user} />
      )}
    </>
  );
};

export default Profile;
