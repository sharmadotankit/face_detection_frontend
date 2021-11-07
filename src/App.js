import './App.css';
import Logo from './Components/Logo/Logo';
import 'tachyons';
import NavigationBar from './Components/NavigationBar/NavigationBar'
import Particles from 'react-particles-js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import { Component } from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '86683cb47d36420e9f0faece03f24913'
});

const particleParams = {
  particles: {
    color: '#000000',
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      }
    }
  }


  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      }
    })
  }

  calculateFaceLocation = (data) => {
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(image);
    return {
      leftCol: width * faceLocation.left_col,
      topRow: height * faceLocation.top_row,
      bottomRow: height - (faceLocation.bottom_row * height),
      rightCol: width - (faceLocation.right_col * width)
    }
  }


  displayFaceLocation = (box) => {
    this.setState({ box: box });
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmitBtnClick = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceLocation(this.calculateFaceLocation(response))

        // console.log(this.state.user.id)
        //code to update entries
        fetch("http://localhost:3001/image",{
          method: 'PUT',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            id:this.state.user.id
          })
        }).then(response=> response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}))
        });
        //code to update user entries ends
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    else if (route === 'signin' || route === "register") {
      this.setState({ isSignedIn: false })
    }


    this.setState({ route: route })
  }

  render() {
    return (
      <div className='MainContainer'>
        <h1 className="tc">Face Recognition App</h1>
        <div className="App">
          <Particles
            params={particleParams}
            className="particlesBg" />
          <NavigationBar onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
          {
            this.state.route === 'home'
              ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onSubmitBtnClick={this.onSubmitBtnClick} />
                <FaceRecognition box={this.state.box} imageSrc={this.state.imageUrl} />
              </div>
              : (this.state.route === "signin")
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          }
        </div>
      </div>
    );
  }

}

export default App;
