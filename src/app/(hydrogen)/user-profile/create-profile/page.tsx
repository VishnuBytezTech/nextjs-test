import { metaObject } from '@/config/site.config';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import CreateUserProfile from '@/app/shared/user-profile/create-user-profile/create-userprofile';

export const metadata = {
  ...metaObject('Create user profile'),
};

export default function CreateProfile() {
  return (
    <>
    <p>this is the create user profile</p>
    <CreateUserProfile />
    </>
  );
}
