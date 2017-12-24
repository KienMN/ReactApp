import React from 'react';
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
{
    name: 'C',
    year: 1972
},
{
    name: 'Elm',
    year: 2012
},
{
    name: 'Kien',
    year: 2012
},
{
    name: 'Kennen',
    year: 2012
},
{
    name: 'Kassadin',
    year: 2012
},
{
    name: 'Kayn',
    year: 2012
},
{
    name: 'NA',
    year: 2012
},
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
    {suggestion.name}
    </div>
    );

class RelatersSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            relaters: this.props.relaters,
            suggestions: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.deleteRelater = this.deleteRelater.bind(this);
    }

    onChange(event, { newValue }) {
        // document.getElementById(this.props.buttonId).className += " disabled";
        this.setState({value: newValue});
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested({ value }) {
        this.setState({suggestions: getSuggestions(value)});
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({suggestions: []});
    };

    onSuggestionSelected(event, { suggestionValue }) {
        // document.getElementById(this.props.buttonId).className = "btn btn-primary";
        // document.getElementById("relaters").appendChild(<RelatersSuggest />);
        console.log(suggestionValue);
    }

    deleteRelater(event) {
        let index = event.target.id;
        this.state.relaters.splice(index, 1);
        let newRelaters = this.state.relaters;
        this.setState((prevState, props) => {
              let {relaters, ...others} = prevState;
              return {relaters: newRelaters, ...others};
        });
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            type: "text",
            placeholder: "Someone name",
            value,
            onChange: this.onChange,
            className: "form-control",
            id: "newRelater"
        };

        // Finally, render it!
        return (
            <div>
                {this.state.relaters.map((relater, index) => 
                    <p key={index} className="text-center">
                        <input className="form-control" type="text" value={relater} readOnly />
                        <br/>
                        <button className="btn btn-danger" onClick={this.deleteRelater} value={relater} id={index}>Xoá người liên quan</button>
                    </p>)}
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected = {this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <br />
                <p className="text-center">
                    <button className="btn btn-success">Thêm người liên quan</button>
                </p>
            </div>
        );
    }
}

export default RelatersSuggest;