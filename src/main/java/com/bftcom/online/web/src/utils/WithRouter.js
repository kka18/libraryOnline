import { useNavigate, useLocation, useParams } from 'react-router-dom';

/**
 * Функция для расширения навигации
 * @param Component Компонент
 * @returns {function(*)}
 */
export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        let params = useParams();

        return (
            <Component
                navigate={navigate}
                params={params}
                location={location}
                {...props}
            />
        );
    };

    return Wrapper;
};