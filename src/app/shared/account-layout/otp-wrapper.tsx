'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import TreeShape from '@/components/shape/tree';
import { siteConfig } from '@/config/site.config';



export default function OtpWrapper({
  children,
  title,
  pageImage,
  isSocialLoginActive = false,
  wrapperClassName = '',
  formClassName = '',
  backHomeClassName = '',
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  wrapperClassName?: string;
  formClassName?: string;
  backHomeClassName?: string;
}) {
  return (
    <>
\
      <div className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-5 2xl:p-10">
        <div
          className={cn(
            'mx-auto mt-5 flex w-full grow items-center justify-center gap-10 md:mt-8 lg:mt-24 lg:max-w-5xl lg:justify-between xl:w-auto xl:max-w-7xl 2xl:max-w-[1720px]',
            wrapperClassName
          )}
        >
          <div
            className={cn(
              'w-full max-w-sm md:max-w-md xl:max-w-lg xl:shrink-0 2xl:w-[656px] 2xl:max-w-none',
              formClassName
            )}
          >
            <div className="mb-10 px-4 text-center lg:px-0 lg:text-start">
              <Link
                href={'/'}
                className="mb-6 inline-block max-w-[168px] xl:mb-8"
              >
                <Image src={siteConfig.logo} alt={siteConfig.title} />
              </Link>
              <Title
                as="h2"
                className="mb-5 text-[26px] leading-normal @container md:text-3xl md:!leading-normal lg:mb-7 lg:pe-8 lg:text-3xl xl:pe-16 xl:text-[32px] 2xl:pe-0 2xl:text-4xl"
              >
                {title}
              </Title>
            </div>


            {children}
          </div>
          <div className="hidden pb-8 pt-10 text-center lg:block lg:w-[500px] xl:w-[600px] xl:pt-14 2xl:block 2xl:w-[730px]">
            {pageImage}
          </div>
        </div>
        <div className="mx-auto mb-6 mt-auto flex w-full justify-end border-b border-gray-900 pe-1 pt-10 lg:mb-10 xl:max-w-7xl 2xl:max-w-[1720px]">
          <TreeShape className="relative -mb-3 h-12 w-16 md:h-14 md:w-20 lg:h-[70px] lg:w-28" />
        </div>
      </div>
    </>
  );
}
