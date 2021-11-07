import './Logo.css';
import Tilt from 'react-tilt';
import faceLogo from './Logo.png';


const Logo = () => {
    return (
        <div className="ma3 mt0">
            <Tilt className="Tilt ba pa3 ma4 shadow-5 mt3 br3" options={{ max: 50 }} style={{ height: 120, width: 120 }} >
            <div className="Tilt-inner">
                <img src={faceLogo} alt="face logo" />
            </div>
        </Tilt>
        </div>
        
    );
}

export default Logo;