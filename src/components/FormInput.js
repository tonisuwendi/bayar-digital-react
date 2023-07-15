import PropTypes from 'prop-types';
import { Label, TextInput } from 'flowbite-react';

const FormInput = ({
    id, label, type, placeholder, icon, value, onChange,
}) => (
    <div className="mt-2">
        <div className="mb-1 block">
            <Label htmlFor={id} value={label} />
        </div>
        <TextInput
            id={id}
            type={type}
            placeholder={placeholder}
            icon={icon}
            value={value}
            onChange={onChange}
        />
    </div>
);

FormInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    icon: PropTypes.any,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

FormInput.defaultProps = {
    id: '',
    label: '',
    type: 'text',
    placeholder: '',
    icon: null,
    value: '',
    onChange: () => {},
};

export default FormInput;
