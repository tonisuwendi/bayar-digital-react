import PropTypes from 'prop-types';

const Title = ({ children, className }) => (
    <h2 className={`text-4xl md:text-6xl font-extrabold text-center text-white ${className}`}>{children}</h2>
);

Title.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Title.defaultProps = {
    className: '',
};

export default Title;
