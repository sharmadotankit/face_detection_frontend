import './NavigationBar.css';

const NavigationBar = ({onRouteChange,isSignedIn}) =>{
    if(isSignedIn===true){
        return(
            <nav className="navigationBar">
                <p onClick={()=> onRouteChange("signin")}>Sign Out</p>
            </nav>
        );
    }
    else{
        return(
            <nav className="navigationBar">
            <p onClick={()=> onRouteChange("signin")} >Sign in </p>
            <p onClick={()=> onRouteChange("register")}>Register</p>
        </nav>

        );
    } 
    
}


export default NavigationBar;