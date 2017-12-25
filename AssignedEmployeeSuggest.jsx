import React from 'react';
import Autosuggest from 'react-autosuggest';

class AssignedEmployeeSuggest extends React.Component {
    constructor(props) {
        super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
        this.state = {
            assignedEmployee: this.props.assignedEmployee,
            value: "",
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
        document.getElementById(this.props.buttonId).className += " disabled";
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
        document.getElementById(this.props.buttonId).className = "btn btn-primary";
        this.props.changeEmployee(suggestion.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            assignedEmployee: nextProps.assignedEmployee
        })
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: "Type and select",
            value,
            onChange: this.onChange,
            className: "form-control",
            id: "newAssignedEmployee"
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected = {this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default AssignedEmployeeSuggest;