import PropTypes from 'prop-types';
import { Label, TextInput } from 'flowbite-react';

const FormInput = ({
    id, label, type, placeholder, icon,
}) => (
    <div className="mt-2">
        <div className="mb-1 block">
            <Label htmlFor={id} value={label} />
        </div>
        <TextInput id={id} type={type} placeholder={placeholder} icon={icon} />
    </div>
);

FormInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.node,
};

FormInput.defaultProps = {
    id: '',
    label: '',
    type: 'text',
    placeholder: '',
    icon: null,
};

export default FormInput;
