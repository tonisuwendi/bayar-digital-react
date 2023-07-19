export const catchError = (error) => {
    let message = 'Unknown error';
    if (!error) return message;
    if (typeof error === 'string') message = error;
    if (
        Object.prototype.hasOwnProperty.call(error, 'error')
        && typeof error.error === 'string'
    ) ({ error: message } = error);
    if (
        Object.prototype.hasOwnProperty.call(error, 'message')
        && typeof error.message === 'string'
    ) ({ message } = error);
    if (
        Object.prototype.hasOwnProperty.call(error, 'msg')
        && typeof error.msg === 'string'
    ) ({ msg: message } = error);
    return message;
};

export const currency = (number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
}).format(number);

export const paymentMethodConverter = (paymentMethods) => {
    const newPaymentMethod = paymentMethods.map((payment) => ({
        value: payment.code,
        label: payment.name,
    }));
    return [
        {
            value: '',
            label: '-- Pilih salah satu --',
        },
        ...newPaymentMethod,
    ];
};

export const formatDateToIndonesian = (dateString) => {
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const formattedDate = `${day} ${months[monthIndex]} ${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} WIB`;
    return formattedDate;
};
