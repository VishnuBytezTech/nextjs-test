'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Password, Button, Switch, Input, Text,  } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { login } from '@/redux/features/authentication-slice';
// import { Select } from 'rizzui';


import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import { userCreateSchema, userCreateInput } from '@/utils/validators/user-invitation/user-create-shcema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserByInvitation } from '@/redux/features/user-invitation-slice';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { fetchCountryThunk } from '@/redux/features/country-slice';
import moment from 'moment-timezone';
import Select from 'react-select';

interface loginInput {
  username: string,
  password: string
}

export default function CreateUserInviteForm() {

  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<userCreateInput>({ firstName: '', lastName: '', password:'', country:'', timezone:'', confirmPassword:'' });

  // const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.authReducer.error);

  const router = useRouter();
  const [inviteId, setInviteId] = useState<string | null>(null);
  const { closeModal, openModal } = useModal();

  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [timezone, setTimezone] = useState<{ value: string; label: string; }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesList, setCountriesList] = useState([])

  const getTimezones = () => {
    return moment.tz.names();
  };

  useEffect(() => {
    const timezones = getTimezones();
    setTimezone(timezones.map(tz => ({ value: tz, label: tz })));
  }, []);

  const handleTimezoneChange = (selectedOption: any) => {
    setSelectedTimezone(selectedOption.label);
    console.log("Selected timezone: ", selectedOption);
  };


  const customFilterOption = (option: any, inputValue: any) => {
    if (inputValue.length < 2) {
      return false;
    }
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };


  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('user_invitation');

    if (id) {
      console.log("Original ID:", id); 
      setInviteId(id);
    }
  }, []);



  const methods = useForm<userCreateInput>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      firstName: '',
      lastName: "",
      password: '',
      confirmPassword: ''
    }
  })

  type UserData = {
    user_invitation: string;
    first_name: string;
    last_name: string;
    password: string;
    // country: string;
    // timezone: string;
  };


  const onSubmit: SubmitHandler<userCreateInput> = (data) => {
    const userData: UserData = {
      user_invitation: inviteId || '',
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      // country: data.country,
      // timezone: selectedTimezone || ''
    };

    console.log("User data :::::::::::::::", userData);
    if (inviteId) {
      if (data.password !== data.confirmPassword) {
        toast.error(
          <Text as="b">Password mismatch</Text>
        );
      } else if (!selectedCountry) {
        toast.error(
          <Text as="b">Please select your country</Text>
        );
      } else if (!selectedTimezone) {
        toast.error(
          <Text as="b">Please select your timezone</Text>
        );
      } else {
  
        dispatch(
          createUserByInvitation({ userData })
        )
          .unwrap()
          .then((response) => {
            if (response && response.status) {
              if (response.status === 201 || response.status === 200) {
                // Successful creation
                setLoading(false);
                methods.reset();
                closeModal();
                toast.success(
                  <Text as="b">
                    Congratulations! Your account has been created successfully
                  </Text>
                );
                router.push('/signin');
              } else {
                handleError(response.status, response.data);
              }
            } else {
              // Handle case where response or response.status is undefined
              toast.error(<Text as="b">An unexpected error occurred</Text>);
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error.status) {
              handleError(error.status, error.data);
            } else {
              toast.error(<Text as="b">An error occurred</Text>);
            }
          });
  
        console.log("User data to send :::::", userData);
      }
    } else {
      console.log("Invite ID is not present :::::::::::::::::::");
    }
  };

  const handleError = (status: number, data: any) => {
    if (status === 400) {
      console.log("Bad request:", data.user_invitation);

      toast.error(
        <Text as="b">Bad request: {data.user_invitation}</Text>
      );
    } else if (status === 401) {
      toast.error(
        <Text as="b">Unauthorized access</Text>
      );
    } else {
      // Handle other status codes
      console.log("Error issue form user creation submission:", status);
      toast.error(
        <Text as="b">An error occurred: {data.message || 'Unknown error'}</Text>
      );
    }
    setLoading(false);
  };

  const countries = useSelector((state: RootState) => state.countryreducer.countries);
 
  // useEffect(() => {
  //   console.log("countries list :::::::", countries);
  //   if (countries && countries) {
  //     setCountriesList(countries);
  //     console.log("countriesList :::::::", countriesList); // This will log the updated countriesList
  //   }
  // }, [countries]); // Update dependency array

  useEffect(()=>{
    dispatch(fetchCountryThunk())
  }, [])

  const handleCountryChange = (selectedOption: any) => {
    console.log("selected option :::::::", selectedOption)
    setSelectedCountry(selectedOption.label)
    console.log("value L::::::::::", selectedCountry)
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedOption.label
    }));
  }



  const isMedium = useMedia('(max-width: 1200px)', false);


  return (
    <div className="xl:pe-12 2xl:pe-20">
      <Form<userCreateInput> 
        validationSchema={userCreateSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className=" space-y-5 lg:space-y-6">
            <div className='flex gap-12'>
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="First Name"
                placeholder="Enter your first name"
                className="[&>label>span]:font-medium"
                {...register('firstName')}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                }}
                error={errors.firstName?.message}
              />
              <Input
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="Last Name"
                placeholder="Enter your last"
                className="[&>label>span]:font-medium"
                {...register('lastName')}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                }}
                error={errors.lastName?.message}
              />
  
              </div>


            <div className="flex col-span-full flex-wrap gap-4">
            <p className='font-medium text-gray-900 dark:text-white'>Country</p>
              <Select
                // labelClassName="font-medium text-gray-900 dark:text-white"
                // dropdownClassName="p-2 gap-1 grid !z-[10]"
                className='w-full'
                value={selectedCountry} 
                onChange={handleCountryChange}
                isSearchable={true}
                placeholder={selectedCountry ? selectedCountry: 'Please select country'}
                options={countries ? countries.map(country => ({
                  label: country.name,
                  value: country.id
                })) : []}
              />
            
            </div>
    <div className="flex col-span-full flex-wrap gap-4">
      <p className='font-medium text-gray-900 dark:text-white'>Timezone</p>
      <Select
        className='w-full'
        value={selectedTimezone}
        isSearchable={true}
        onChange={handleTimezoneChange}
        options={timezone}
      />
    </div>

              <div className='flex gap-5'>
              <Password
                label="Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                className="[&>label>span]:font-medium"
                {...register('password')}
                value={formData.password} // Ensure value is set from state
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                error={errors.password?.message}
              />
                <Password
                label="Confirm Password"
                placeholder="Confirm your password"
                size={isMedium ? 'lg' : 'xl'}
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                }}
                error={errors.confirmPassword?.message}
                />
  
              </div>


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
        )}
      </Form>
    </div>
  );
}


