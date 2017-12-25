import React from 'react';
import Autosuggest from 'react-autosuggest';

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
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions ( value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.employeesNameAndId.filter(emp =>
            emp.name.toLowerCase().slice(0, inputLength) === inputValue
            );
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue (suggestion) {return suggestion.name;}

    //render suggestions.
    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.name}
            </div>
        );
    }

    onChange(event, { newValue }) {
        this.setState({value: newValue});
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested({ value }) {
        this.setState({suggestions: this.getSuggestions(value)});
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({suggestions: []});
    };

    onSuggestionSelected(event, { suggestion }) {
        this.props.addRelater(suggestion.id);
        this.setState({value: ""});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            relaters: nextProps.relaters
        })
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            type: "text",
            placeholder: "Type and select",
            value,
            onChange: this.onChange,
            className: "form-control",
        };
        // Finally, render it!
        return (

            <div>
                {this.state.relaters.map((relater, index) => 
                    <p key={index} className="text-center">
                        <input className="form-control" type="text" value={this.props.employeesNameAndId[relater - 1].name} readOnly />
                        <br/>
                        <button className="btn btn-danger" onClick={this.props.removeRelater} value={relater} id={index}>Xoá người liên quan</button>
                    </p>)}
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected = {this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default RelatersSuggest;