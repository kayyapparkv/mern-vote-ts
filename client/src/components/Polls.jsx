import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPolls, getUserPolls } from '../store/actions/polls';

class Polls extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {getPolls} = this.props;
        getPolls();
    }
    render() {
        const data = Array.from(this.props.polls);
        const polls = Object.keys(this.props.polls).map(
            (key, index) =><li>{this.props.polls.data[index].question}</li>
        );
        return (
             <Fragment>
            <ul>{polls}</ul>
            </Fragment>
        );
    }
}

export default connect(
    store => ({
        auth: store.auth,
        polls: store.polls
    }),
    { getPolls, getUserPolls }
)(Polls);