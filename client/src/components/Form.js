import React, { Component } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import Loading from './Loading'

export default class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
          loading: false,
          list: '',
          artist: ''
        }
      }

    handleArtistChange = event => {
        this.setState({artist: event.target.value});
    }

    getArtistData = async () => {
        fetch('/'+this.state.artist)
        .then(res => res.json())
        .then(data => {
            var items = '';
            console.log(data);
            for (var song in data) {
                items += `<h3> <ol> ${song + " : "}`
                for (var i in data[song]) {
                    items +=  `<li style="text-align: left;"> 
                    ${data[song][parseInt(i)]} </li>`
                }
                items += `</ol> </h3>`
            }
            this.setState({list: items})
            this.setState({loading: false})
        }, [])
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        this.getArtistData(this.state.artist);
    }

    componentDidMount(){
        this.getArtistData()
    }
    
    render() {
        const data = '<div>' + this.state.list + '</div>';
        return (
            <div>
            <form onSubmit={this.handleSubmit} >
                <input 
                placeholder="Name an artist"
                type="text"
                name="artist"
                value={this.state.artist}
                onChange={this.handleArtistChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
            <ul dangerouslySetInnerHTML={{__html: data}}></ul>
            <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
            </div>
        ) 
    }
}