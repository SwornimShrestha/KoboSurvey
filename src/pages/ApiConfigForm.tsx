import { Badge, Button, TextInput, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo/private-key-generator_14162116.gif';
import { useContext } from 'react';
import { ApiConfig, ApiConfigContext } from '../context/ApiConfigContext';
import { useForm } from '@mantine/form';

import { IconCopy } from '@tabler/icons-react';
const ApiConfigForm = () => {
  const form = useForm<ApiConfig>({
    initialValues: {
      apikey: '',
      baseUrl: '',
    },
    validate: {
      apikey: (value) => (value ? null : 'API Key is required'),
      baseUrl: (value) => (value ? null : 'Base URL is required'),
    },
  });
  const navigate = useNavigate();
  const { setApiconfig } = useContext(ApiConfigContext);
  const handleSubmit = (values: any) => {
    setApiconfig(values);
    console.log(values);
    navigate('/dashboard');
  };
  const handleTestCLick = () => {
    form.setFieldValue('apikey', 'e9218ca8da90d8b169ca284cc84ead3bfc81de01');
    form.setFieldValue('baseUrl', 'api/v2/assets');
  };
  const icon = <IconCopy style={{ width: rem(12), height: rem(12) }} />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-[4%]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-semibold tracking-tight text-gray-900">
          KoboToolBox Api Configuration
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
          <div>
            <TextInput
              variant="filled"
              description="Please provide the API Key provided by the service "
              withAsterisk
              label="Api Key"
              placeholder="XXX XXX XXX XXX XXXX"
              key={form.key('apikey')}
              {...form.getInputProps('apikey')}
            />
          </div>

          <div>
            <TextInput
              variant="filled"
              description="Enter the Base URL "
              withAsterisk
              label="Base URL"
              placeholder="api/v*"
              key={form.key('baseUrl')}
              {...form.getInputProps('baseUrl')}
            />
          </div>

          <div className="flex flex-col gap-3 items-end">
            <Button type="submit" fullWidth>
              Submit
            </Button>
            <div className=" cursor-pointer">
              <Badge
                onClick={handleTestCLick}
                leftSection={icon}
                variant="light"
                color="red"
                radius="xs"
              >
                Copy Test Credentials
              </Badge>
            </div>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Make sure to enter valid and accurate information to avoid connection
          errors. Contact your API provider if you're unsure about the required
          details. <span></span>
          <a
            href="#"
            className="font-semibold text-sky-600 hover:text-indigo-500"
          >
            Click 'Submit' to save your configuration.
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiConfigForm;
