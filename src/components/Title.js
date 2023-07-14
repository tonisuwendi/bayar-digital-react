import PropTypes from 'prop-types';

const Title = ({ children }) => (
    <h2 className="text-4xl md:text-6xl font-extrabold text-white">{children}</h2>
);

Title.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Title;
