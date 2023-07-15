import PropTypes from 'prop-types';
import { Label, Select } from 'flowbite-react';

const FormSelectOption = ({
    id, label, data, onChange,
}) => (
    <div className="mt-2">
        <div className="mb-1 block">
            <Label htmlFor={id} value={label} />
        </div>
        <Select id={id} onChange={onChange}>
            {data.map((item) => (
                <option
                    selected={!item.value}
                    disabled={!item.value}
                    key={item.value}
                    value={item.value}
                >
                    {item.label}
                </option>
            ))}
        </Select>
    </div>
);

FormSelectOption.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    })),
};

FormSelectOption.defaultProps = {
    id: '',
    label: '',
    onChange: () => {},
    data: [],
};

export default FormSelectOption;
