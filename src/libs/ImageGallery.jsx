// import {CSSTransitionGroup} from 'react-transition-group';
import React from "react";
import './ImageGallery.scss';

const ImageURL = [
  'https://images.unsplash.com/photo-1522204538344-922f76ecc041?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=50e38600a12d623a878983fc5524423f&auto=format&fit=crop&w=751&q=80',
  'https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6ef3d9fab9593225bc80ddad5c0f7308&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f5a57d73d6a357b35b35220d9b150b02&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/1/apple-gear-looking-pretty.jpg?ixlib=rb-0.3.5&s=f2c32e45682d8b19a77fa594d2b5980d&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1421757295538-9c80958e75b0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=0951c1944637dbfce6904add6c55ce8a&auto=format&fit=crop&w=753&q=80',
  'https://images.unsplash.com/photo-1511367734837-f2956f0d8020?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=07df2ec833c0d0cc1086c49f28042239&auto=format&fit=crop&w=694&q=80',
  'https://images.unsplash.com/photo-1518118115078-c6adc68910bd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb1cd92c0f9683fe93a6fd99a8277b0f&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1516865690679-db5c36d24903?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e26149ded25a0beda73c5942768257c&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&s=52e6edc6f5427ca1cc3a895ae4e01ea5&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8a87674644cd4f622df5c57facbccf1e&auto=format&fit=crop&w=500&q=60'
];

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0, slideshow: false, fullscreen: false };
    //this.prevHandler=this.prevHandler.bind(this);
    //this.nextHandler=this.nextHandler.bind(this);
    //this.dotHandler=this.dotHandler.bind(this);
    //this.slideshowHandler=this.slideshowHandler.bind(this);
    this.exitfullScreen = this.exitfullScreen.bind(this);
    //this.enterfullScreen=this.enterfullScreen.bind(this);
    this.slideTransition = this.slideTransition.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.left = 0;
    //this.myImage = React.createRef();
    this.images = props.images;
  }
  slideTransition = slider => {
    if (this.state.currentIndex == this.images.length - 1) {
      this.left = 0;
      slider.style.left = this.left + 'px';
    } else {
      this.left = this.left - 60;
      slider.style.left = this.left + 'px';
    }
  };

  componentDidMount() {
    setInterval(() => {
      if (this.state.slideshow === true) {
        var slider = document.getElementById('slider-img-container');
        var index =
          this.state.currentIndex === this.images.length - 1 ? 0 : this.state.currentIndex + 1;

        this.slideTransition(slider);

        this.setState(prevState => ({
          currentIndex:
            prevState.currentIndex === this.images.length - 1 ? 0 : prevState.currentIndex + 1
        }));
      }
    }, 2000);
  }

  slideshowHandler = event => {
    this.setState(prevState => ({
      slideshow: prevState.slideshow === false ? true : false
    }));
  };

  exitfullScreen = event => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    var i = document.getElementsByClassName('gallery-img-container ')[0];
    i.getElementsByClassName('gallery-img')[0].style.height = '300px';
    i.getElementsByClassName('gallery-img')[0].style.width = '100%';
    this.setState(prevState => ({
      fullscreen: prevState.fullscreen === false ? true : false
    }));
  };

  enterfullScreen = event => {
    var i = document.getElementsByClassName('gallery-img-container ')[0];

    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    }

    i.getElementsByClassName('gallery-img')[0].style.height = '100%';
    i.getElementsByClassName('gallery-img')[0].style.width = '100%';

    this.setState(prevState => ({
      fullscreen: prevState.fullscreen === false ? true : false
    }));
  };

  dotHandler = event => {
    var imgIndex = event.target.id;

    var slider = document.getElementById('slider-img-container');
    this.left = parseInt(imgIndex) * -60;
    slider.style.left = this.left + 'px';

    this.setState({ currentIndex: parseInt(imgIndex) });
  };

  updateImage = event => {
    var imgIndex = event.target.id;

    var slider = document.getElementById('slider-img-container');
    this.left = parseInt(imgIndex) * -60;
    slider.style.left = this.left + 'px';

    this.setState({ currentIndex: parseInt(imgIndex) });
  };

  prevHandler = event => {
    var slider = document.getElementById('slider-img-container');
    var index = this.state.currentIndex === 0 ? this.images.length - 1 : this.state.currentIndex - 1;

    this.slideTransition(slider);

    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex === 0 ? this.images.length - 1 : prevState.currentIndex - 1
    }));
  };

  nextHandler = event => {
    var slider = document.getElementById('slider-img-container');
    var index = this.state.currentIndex === this.images.length - 1 ? 0 : this.state.currentIndex + 1;

    this.slideTransition(slider);

    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex === this.images.length - 1 ? 0 : prevState.currentIndex + 1
    }));
  };

  render() {
    //class="material-icons"
    var i = this.state.currentIndex;
    var dotNumbers = Array.from(Array(this.images.length).keys());
    const carouselDots = dotNumbers.map((n, index) => (
      <div
        className={[
          'carousel-dot',
          index === this.state.currentIndex ? 'active' : ''
        ].join(' ')}
        key={n}
        id={n}
        onClick={this.dotHandler}
      >
        &#9679;
      </div>
    ));
    const ImgItem = (
      <div className="gallery-img-container">
        <img className="gallery-img" src={this.images[i]} />
        <button className="prev-carousel-button" onClick={this.prevHandler}>
          &#9664;
        </button>
        <div id="carousel-dot-container">{carouselDots}</div>
        <div className="next-carousel-button" onClick={this.nextHandler}>
          &#9654;
        </div>
        {this.state.slideshow === false ? (
          <button className="slideshow-button" onClick={this.slideshowHandler}>
            &#9654;
          </button>
        ) : (
          <button className="slideshow-button" onClick={this.slideshowHandler}>
            &#9646;&#9646;
          </button>
        )}
        {this.state.fullscreen === false ? (
          <button className="fullscreen-button" onClick={this.enterfullScreen}>
            &#9635;
          </button>
        ) : (
          <button className="fullscreen-button" onClick={this.exitfullScreen}>
            &#9635;
          </button>
        )}
      </div>
    );
    var imgId = 0;

    const sliderImages = this.images.slice(0, 10).map((n, index) => (
      <img
        className={[
          'slider-img',
          index === this.state.currentIndex ? 'active' : ''
        ].join(' ')}
        src={n}
        key={n}
        id={imgId++}
        onClick={this.updateImage}
      />
    ));

    return (
      <div id="gallery-container" ref={this.myImage}>
        {ImgItem}
        <div id="slider-img-container" ref={this.mySlider}>
          {sliderImages}
        </div>
      </div>
    );
  }
}