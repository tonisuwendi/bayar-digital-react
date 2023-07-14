import { useParams } from 'react-router-dom';

import { FancyLayout, Title } from '../components';

const PaymentPage = () => {
    const { id: paramsID } = useParams();

    return (
        <FancyLayout>
            <Title>{`Payment Page: ${paramsID}`}</Title>
        </FancyLayout>
    );
};

export default PaymentPage;
