'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password, Button, Switch, Input, Text,  } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { login } from '@/redux/features/authentication-slice';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AppDispatch, RootState, } from '@/redux/store';
import toast from 'react-hot-toast';


interface loginInput {
  username: string,
  password: string
}

interface Form<T> {
  onSubmit: (data: T) => void; // Adjust the return type as needed
  // Other properties
}

export default function SignInForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<loginInput>({ username: '', password: '' });
  const router = useRouter();
  // const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.authReducer.error);

  const roleOptions = [
    { value: 'india', label: 'India' },
    // { value: 'manager', label: 'Manager' },
    // { value: 'supervisor', label: 'Supervisor' },
    // { value: 'prep_lab', label: 'Prep Lab' },
    // { value: 'lab', label: 'Lab' },
    // { value: 'finance', label: 'Finance' },
  ];

  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = (selectedOption: any) => {
    setSelectedRole(selectedOption);
    console.log("selected role :::::::::::", selectedRole)
  };


  const onSubmit  = async (data: { username: string; password: string }) => {

    setIsLoading(true);

    try {
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        toast.success(
          <Text>
            Login successfull
          </Text>
        );
        router.push('/admin-dashboard');
      } else {
        toast.error(
          <Text>
            Please check the credentials
          </Text>
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);

    } finally {
      console.log("login api is not working")


      setIsLoading(false);
    }
  };

  const isMedium = useMedia('(max-width: 1200px)', false);
  // const onSubmit: SubmitHandler<LoginSchema> = (data) => {
  //   console.log('Sign in data ->', data);
  // };

  return (
    <div className="xl:pe-12 2xl:pe-20">
      {/* <Form<LoginSchema>
        validationSchema={loginSchema}
        // onSubmit={onSubmit}
        
        useFormProps={{
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => ( */}
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Username"
              placeholder="Enter your username"
              className="[&>label>span]:font-medium"
              // {...register('email')}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
              // error={errors.username?.message}
            />



            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              // {...register('password')}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              // error={errors.password?.message}
            />
            <div className="flex items-center justify-between">
              {/* <Switch
                label="Remember Me"
                className="[&>label>span]:font-medium [&>label]:my-1"
                {...register('rememberMe')}
              /> */}
              <Link
                href={routes.account.forgotPassword}
                className="h-auto p-0 text-sm font-medium text-gray-900 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button
              className="w-full bg-black hover:bg-gray-800"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              disabled={isLoading} // Disable button while loading
              onClick={() => {
                onSubmit(formData);
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'} {/* Change button text based on loading state */}
            </Button>
          </div>

    </div>
  );
}








// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { login } from '@/utils/auth';

// export default function SignInForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const onSubmit = async (data) => {
//     try {
//       setIsLoading(true);
//       await login(data.email, data.password);
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setIsLoading(false);
//       // Handle login error (e.g., display error message)
//     }
//   };

//   return (

//   );
// }
