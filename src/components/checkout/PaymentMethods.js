import Radio from "../form/Radio";
import { paymentMathods } from "../../utils/constant";

const PaymentMethods = ({ handlePaymentInfo }) => {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Payment Methods
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">Choose One.</p>
      <div className="mt-6 space-y-6">
        {paymentMathods?.map((pay, i) => (
          <Radio
            key={i}
            id="paymentMethod"
            onChange={handlePaymentInfo}
            title={pay.name}
          >
            {pay.name}
          </Radio>
        ))}
      </div>
    </fieldset>
  );
};

export default PaymentMethods;
