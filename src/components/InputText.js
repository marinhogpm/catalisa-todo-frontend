import { Form, Input } from 'antd';
import { useState } from 'react';

const InputText = (props) => {
  const { label, onChange, validate, required, ...others } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [changed, setChanged] = useState(null);

  const validateStatus = errorMessage ? 'error' : 'success';

  const handleValidation = (event) => {
    const { name, value , checked} = event.target;
    setChanged(true);
    let isValid = true;
    if (validate) {
      const message = validate(value);
      setErrorMessage(message);
      isValid = !message;
    }

    if (onChange) {
      onChange({
        target: {
          name,
          value: isValid ? value : null,
          checked: checked
        }
      });
    }
  };

  return (
    <Form.Item
      validateStatus={validateStatus}
      label={label}
      help={errorMessage}
      hasFeedback={changed}
      required={required}
    >
      <Input {...others} required={required} onChange={handleValidation} />
    </Form.Item>
  );
}

export default InputText;