import { Button, TextInput } from '@mantine/core';
const ApiConfigForm = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-[4%]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" /> */}
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Api Configuration
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <TextInput
              variant="filled"
              description="Please provide the API Key provided by the service "
              withAsterisk
              label="Api Key"
              placeholder="XXX XXX XXX XXX XXXX"
            />
          </div>

          <div>
            <TextInput
              variant="filled"
              description="Enter the Base URL "
              withAsterisk
              label="Base URL"
              placeholder="api/v*"
            />
          </div>

          <div>
            <Button type="submit" fullWidth>
              Submit
            </Button>
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
