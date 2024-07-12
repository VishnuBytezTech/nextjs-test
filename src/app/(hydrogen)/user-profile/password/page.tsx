import { metaObject } from '@/config/site.config';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';

export const metadata = {
  ...metaObject('Reset password'),
};

export default function UserProfilePassword() {
  return (
    <>
    <p>this is the password page</p>
    </>
  );
}
