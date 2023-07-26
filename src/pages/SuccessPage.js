import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';
import {
    Alert, Button, Card, Table, Tooltip,
} from 'flowbite-react';

import { getPayment } from '../services/endpoint/payment';
import { catchError, currency, formatDateToIndonesian } from '../helpers/utils';
import { PAYMENT_METHOD } from '../helpers/enums';
import { AlertInfo, Loading, PaymentStatus } from '../components';

const SuccessPage = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [payment, setPayment] = useState({
        invoice: '',
        amount: '',
        payment_channel: '',
        payment_code: '',
        expired_date: '',
        status: 0,
        buyer_name: '',
        buyer_phone: '',
        buyer_email: '',
        qr_code: '',
        info_message: {
            pending: '',
            success: '',
            expired: '',
        },
        external_link: {
            is_active: false,
            button_label: '',
            link: '',
        },
    });

    const navigate = useNavigate();
    const { id: paramsID } = useParams();

    const handleFetchPayment = async () => {
        try {
            const response = await getPayment(paramsID);
            if (!response.success) throw new Error(response.message);
            setPayment(response.data);
            setPageLoading(false);
        } catch (error) {
            const errorText = catchError(error);
            if (errorText === 'Silakan pilih pembayaran dulu.' || errorText === 'Invoice tidak ditemukan.') {
                navigate(`/${paramsID}`);
            } else {
                toast.error(catchError(error));
            }
        }
    };

    useEffect(() => {
        let intervalPayment;

        if (payment.status === 0) {
            intervalPayment = setInterval(() => {
                handleFetchPayment();
            }, 5000);
        } else {
            clearInterval(intervalPayment);
        }

        return () => clearInterval(intervalPayment);
    }, [paramsID, payment]);

    const handleCopy = () => {
        toast.success('No. pembayaran berhasil disalin!');
    };

    if (pageLoading) return <Loading />;

    const paymentData = PAYMENT_METHOD.find((payMethod) => payMethod.channel === payment.payment_channel);

    const handleOpenExternalLink = () => window.open(payment.external_link.link, '_blank');

    return (
        <div className="sm:w-[450px] w-[95%] mb-10 mx-auto mt-5">
            <h2 className="text-center font-bold text-indigo-600 text-2xl mb-5">bayar.digital</h2>
            <hr />
            <AlertInfo value={payment.status} infoMessage={payment.info_message} />
            {payment.status === -2 && (
                <Link to={`/${paramsID}`}>
                    <Button size="sm" className="mb-3 inline" color="warning">Checkout Ulang</Button>
                </Link>
            )}
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell className="pt-4 pb-1.5">
                            Invoice
                        </Table.Cell>
                        <Table.Cell className="pt-4 pb-1.5">
                            {payment.invoice}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="py-1.5">
                            Nama
                        </Table.Cell>
                        <Table.Cell className="py-1.5">
                            {payment.buyer_name}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="py-1.5">
                            Email
                        </Table.Cell>
                        <Table.Cell className="py-1.5">
                            {payment.buyer_email}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="py-1.5">
                            No. Telepon
                        </Table.Cell>
                        <Table.Cell className="py-1.5">
                            {payment.buyer_phone}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="pt-1.5 pb-4">
                            Total Tagihan
                        </Table.Cell>
                        <Table.Cell className="pt-1.5 pb-4 font-bold text-lg text-slate-800">
                            {currency(payment.amount)}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="border-t">
                        <Table.Cell className="pt-4 pb-1.5">
                            Status Transaksi
                        </Table.Cell>
                        <Table.Cell className="pt-4 pb-1.5">
                            <PaymentStatus value={payment.status} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="pt-1.5 pb-4">
                            Metode Pembayaran
                        </Table.Cell>
                        <Table.Cell className="pt-1.5 pb-4">
                            {paymentData?.name}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            {payment.status === 0 && (
                <>
                    <Alert className="mt-4" color="warning">
                        Batas waktu pembayaran:
                        {' '}
                        {formatDateToIndonesian(payment.expired_date)}
                    </Alert>
                    <Card className="mt-2 border-none">
                        <div className="flex justify-between items-center">
                            {payment.qr_code ? (
                                <div className="flex w-full flex-col items-center">
                                    <span className="text-slate-800 text-sm text-justify">Silakan scan QR Code berikut menggunakan aplikasi yang mendukung scan QR Code seperti Dana, GoPay, OVO, ShopeePay, LinkAja, BCA Mobile, atau yang lainnya.</span>
                                    <div className="border rounded-lg p-3 mt-4">
                                        <QRCode value={payment.qr_code} style={{ height: 'auto' }} className="sm:w-40 w-full" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-slate-600 text-sm">No. Bayar</p>
                                    <p className="text-slate-800 font-medium flex items-center">
                                        {payment.payment_code}
                                        <Tooltip content="Salin">
                                            <CopyToClipboard text={payment.payment_code} onCopy={handleCopy}>
                                                <MdContentCopy className="ml-2 cursor-pointer" />
                                            </CopyToClipboard>
                                        </Tooltip>
                                    </p>
                                </>
                            )}
                        </div>
                        <hr />
                        <div>
                            <p className="text-sm text-slate-700">Klik tombol dibawah untuk melihat panduan pembayaran.</p>
                            <a href={paymentData.guide} target="_blank" rel="noreferrer">
                                <Button size="xs" color="purple" className="inline mt-2">Lihat Panduan Pembayaran</Button>
                            </a>
                        </div>
                    </Card>
                </>
            )}
            {payment.status === 1 && payment.external_link.is_active && (
                <Card className="mt-2 border-none">
                    <Button onClick={handleOpenExternalLink}>{payment.external_link.button_label}</Button>
                </Card>
            )}
        </div>
    );
};

export default SuccessPage;
