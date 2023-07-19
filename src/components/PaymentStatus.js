import PropTypes from 'prop-types';
import { Badge } from 'flowbite-react';

const PaymentStatus = ({ value }) => {
    let status;
    switch (value) {
    case 0:
        status = {
            color: 'info',
            label: 'Menunggu Pembayaran',
        };
        break;
    case 1:
        status = {
            color: 'success',
            label: 'Berhasil',
        };
        break;
    case -2:
        status = {
            color: 'failure',
            label: 'Kadaluarsa',
        };
        break;
    default:
        status = {
            status: '',
            label: '-',
        };
        break;
    }

    return (
        <Badge color={status.color} className="inline">
            {status.label}
        </Badge>
    );
};

PaymentStatus.propTypes = {
    value: PropTypes.number.isRequired,
};

export default PaymentStatus;
