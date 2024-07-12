import { useModal } from '@/app/shared/modal-views/use-modal';
import dayjs from 'dayjs';
import { PiCalendarCheckLight, PiMapPinLight, PiXBold } from 'react-icons/pi';
import { Text, ActionIcon, Title, Button, Avatar } from 'rizzui';

export default function CommodityDetails({
  data,
  onDelete,
  onEdit,
}: {
  data?: any;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { closeModal } = useModal();

  console.log(data, 'doctor');
  return (
    <div className="block">
      <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
        <Title
          as="h3"
          className="font-lexend text-xl font-semibold md:text-2xl"
        >
          Commodity Details
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="p-5 md:px-7 md:pb-7 md:pt-6">
        <Title
          as="h3"
          className="mb-5 font-lexend "
        >
        </Title>


          <style >{`
            .label {
              display: inline-block;
              width: 150px; /* Adjust width as needed */
              font-weight: bold;
            }
          `}</style>



          <div
            key="{item.id}"
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-start gap-2">
              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                Name
              </Text>
            </div>
            <Text className='mr-4' as="span">{data.name}</Text>
          </div>



          {/* <div
            key="{item.id}"
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-start gap-2">

              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                Phone
              </Text>
            </div>
            <Text className='mr-4' as="span">{data.phone}</Text>
          </div> */}

          {/* <div
            key="{item.id}"
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-start gap-2">
              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                Email
              </Text>
            </div>
            <Text className='mr-4' as="span">{data.email}</Text>
          </div> */}

          {/* <div
            key="{item.id}"
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-start gap-2">

              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                Country
              </Text>
            </div>
            <Text className='mr-4' as="span">{data.country.name}</Text>
          </div> */}



        <div className="mt-7 flex justify-end gap-3">
          <Button
            variant="solid"
            className="min-w-[80px]"
            onClick={(e) => (onDelete(), closeModal())}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
