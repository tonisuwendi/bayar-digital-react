import PropTypes from 'prop-types';
import { Alert } from 'flowbite-react';
import { MdOutlineInfo } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

const AlertInfo = ({ value, infoMessage }) => {
    let status;
    switch (value) {
    case 0:
        status = {
            color: 'info',
            label: 'Terima kasih telah melakukan pembelian. Mohon segera melakukan pembayaran. 🙏',
            info: infoMessage.pending,
        };
        break;
    case 1:
        status = {
            color: 'success',
            label: 'Pembayaran Anda telah berhasil. Terima kasih! 🥳',
            info: infoMessage.success,
        };
        break;
    case -2:
        status = {
            color: 'failure',
            label: 'Maaf, pembayaran Anda telah kadaluarsa. Silakan melakukan checkout ulang. Terima kasih. 🙁',
            info: infoMessage.expired,
        };
        break;
    default:
        status = {
            color: '',
            label: '-',
        };
    }

    const { id: paramsID } = useParams();

    return (
        <Alert color={status.color} className="my-4">
            {status.label}
            {value === 0 && (
                <p className="mt-1">
                    Ingin merubah metode pembayaran?
                    {' '}
                    <Link to={`/${paramsID}`} className="font-medium text-violet-700 underline">
                        Checkout ulang
                    </Link>
                </p>
            )}
            {status.info && (
                <span className="text-amber-700 flex gap-1 items-start mt-3">
                    <MdOutlineInfo size={20} />
                    {status.info}
                </span>
            )}
        </Alert>
    );
};

AlertInfo.propTypes = {
    value: PropTypes.number.isRequired,
    infoMessage: PropTypes.shape({
        pending: PropTypes.string.isRequired,
        success: PropTypes.string.isRequired,
        expired: PropTypes.string.isRequired,
    }).isRequired,
};

export default AlertInfo;
