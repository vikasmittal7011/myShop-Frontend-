import { Classes } from "../../utils/constant";

const Address = ({ address }) => {
  return (
    <fieldset className="mt-2">
      <legend className="font-semibold leading-6 text-purple-900">
        Shipping Address
      </legend>
      <div className="mt-2 space-y-6">
        <ul className="divide-y divide-gray-100">
          <li
            className={`flex justify-between ${Classes.flexDirectionClass} gap-x-6 py-5 border bottom-1 rounded-md border-gray-400 px-3`}
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {address.name}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {address.street},
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {address.city}, {address.state},
                </p>
                <p className="text-sm leading-6 text-gray-900"></p>
                <p className="text-sm leading-6 text-gray-900">
                  {address.pinCode}
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.tel}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.email}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </fieldset>
  );
};

export default Address;
