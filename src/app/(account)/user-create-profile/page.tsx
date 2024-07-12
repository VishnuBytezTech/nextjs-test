import AuthWrapperFive from '@/app/shared/auth-layout/auth-wrapper-five';
import SignInForm from '../signin/sign-in-form';
import Image from 'next/image';
import WaveShape from '@/components/shape/wave';
import { metaObject } from '@/config/site.config';
import SigninWrapper from '@/app/shared/account-layout/signin-wrapper';
import CreateUserInviteForm from './create-profile-form';

export const metadata = {
  ...metaObject('Signin'),
};

export default function SignInPage() {
  return (
    <SigninWrapper
      title={
        <>
          Welcome to RC Inspections !
          <span className="relative inline-flex px-2 text-white">
            {/* <span className="relative z-10">SIGN IN!</span>{' '} */}
            {/* <WaveShape className="absolute start-0 top-1/2 h-[52px] w-36 -translate-y-1/2 text-primary md:h-14 md:w-40 xl:h-16 xl:w-44 2xl:h-[70px] 2xl:w-48" /> */}
          </span>
          <span className="relative text-base font-semibold inline-flex px-2">
              Create your account here
          </span>
        </>
      }
      // pageImage={
      //   <div className="relative mx-auto aspect-[1/1.015] w-[540px] xl:w-[600px] 2xl:w-[636px]">
      //     <Image
      //       src={
      //         'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-in-thumb5.webp'
      //       }
      //       alt="Sign Up Thumbnail"
      //       fill
      //       priority
      //       sizes="(max-width: 768px) 100vw"
      //       className="object-cover"
      //     />
      //   </div>
      // }
      isSocialLoginActive
    >
      <CreateUserInviteForm />
    </SigninWrapper>
  );
}
