import PropTypes from 'prop-types';
import { Alert } from 'flowbite-react';

const AlertInfo = ({ value }) => {
    let status;
    switch (value) {
    case 0:
        status = {
            color: 'info',
            label: 'Terima kasih telah melakukan pembelian. Mohon segera melakukan pembayaran. 🙏',
        };
        break;
    case 1:
        status = {
            color: 'success',
            label: 'Pembayaran Anda telah berhasil. Terima kasih! 🥳',
        };
        break;
    case -2:
        status = {
            color: 'failure',
            label: 'Maaf, pembayaran Anda telah kadaluarsa. Silakan melakukan checkout ulang. Terima kasih. 🙁',
        };
        break;
    default:
        status = {
            color: '',
            label: '-',
        };
    }

    return (
        <Alert color={status.color} className="my-4">
            {status.label}
        </Alert>
    );
};

AlertInfo.propTypes = {
    value: PropTypes.number.isRequired,
};

export default AlertInfo;
