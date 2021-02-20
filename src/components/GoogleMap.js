import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
    width: '95%',
    height: '90%',
    top: '0',
};

export class GoogleMap extends Component { 
    constructor(props) {
        super(props);       
        var params = props.params;
        this.state = {
            building: params.building,
            locations: [  params.building,
                        params.location ],     
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            zoom: 16
        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
 
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    };
  
    displayMarkers = () => {
        return( 
            this.state.locations.map((location, index) => {
            return <Marker key={index} id={index} 
                position={{
                  lat: location.lat,
                  lng: location.lng,
                }}
                title={location.title}
                name={location.name}
                onClick = {this.onMarkerClick}
              />   
            })
        )}

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={this.state.zoom}
                style={mapStyles}
                initialCenter={{
                  lat: this.state.building.lat,
                  lng: this.state.building.lng
                }}
                onClick={this.onMapClicked}>
                {this.displayMarkers()} 
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
 
export default  GoogleApiWrapper({
    apiKey: "AIzaSyBt7nd_CE9_Vw4s6qW-rCmPWjrpCOoOZVA",
    v: "3.30"
})(GoogleMap)