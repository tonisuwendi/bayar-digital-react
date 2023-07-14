import PropTypes from 'prop-types';
import { Label, Select } from 'flowbite-react';

const FormSelectOption = ({ id, label, data }) => (
    <div className="mt-2">
        <div className="mb-1 block">
            <Label htmlFor={id} value={label} />
        </div>
        <Select id={id}>
            {data.map((item) => <option key={item.value}>{item.label}</option>)}
        </Select>
    </div>
);

FormSelectOption.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    })),
};

FormSelectOption.defaultProps = {
    id: '',
    label: '',
    data: [],
};

export default FormSelectOption;
