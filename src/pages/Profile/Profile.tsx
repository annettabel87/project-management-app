import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks/ReduxHooks';
import { getUser } from '../../redux/edit-profile-slice';
import EditProfile from '../../components/ProfileEdit/Edit-profile';
import MyProfile from '../../components/ProfileMy/My-profile';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      {editMode ? (
        <EditProfile setEditMode={setEditMode} />
      ) : (
        <MyProfile setEditMode={setEditMode} />
      )}
    </>
  );
};

export default Profile;
