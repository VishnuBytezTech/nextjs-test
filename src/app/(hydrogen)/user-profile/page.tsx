import { metaObject } from '@/config/site.config';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import UserPersonalInfoView from '@/app/shared/user-profile/personal-info/personal-info';

export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function UserProfilePage() {
  return (
    <>
        <UserPersonalInfoView />

    </>
  );
}
