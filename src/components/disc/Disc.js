import React, { Component } from 'react';
import './Disc.scss';

class Disc extends Component {
    isDisabled = () => {
        const { value, isWinner } = this.props;

        return value || isWinner;
    };
    render() {
        const isMatchClass = this.props.isMatch ? 'disc_isMatch' : '';
        return (
            <button className={`disc disc_${this.props.value} ${isMatchClass}`} disabled={this.isDisabled()} onClick={this.props.onClick}>
                <span className="disc-value">{this.props.value}</span>
                <div className="disc-piece"></div>
            </button>
        );
    }
}

export default Disc;
