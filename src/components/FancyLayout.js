import PropTypes from 'prop-types';

const FancyLayout = ({ children }) => (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-r from-indigo-600 to-purple-600 px-2">
        {children}
    </div>
);

FancyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FancyLayout;
