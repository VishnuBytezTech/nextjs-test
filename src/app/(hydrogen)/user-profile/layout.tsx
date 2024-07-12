import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import UserProfileNav from '@/app/shared/user-profile/navigation/user-profile-nav';

const pageHeader = {
  title: 'User Profile',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: routes.forms.profileSettings,
      name: 'User Profile',
    },
    {
      name: 'User Profile',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title}  />
      <UserProfileNav />
      {children}
    </>
  );
}
