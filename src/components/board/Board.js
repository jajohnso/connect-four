import React, { Component } from 'react';
import Disc from '../disc/Disc';
import './Board.scss';
import classNames from '../../utilities/ClassNames';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredRow: null,
        };
    }
    getColumnIndex = (index) => {
        const { WIDTH } = this.props.config;

        return index < WIDTH ? index : index % WIDTH;
    };

    handleOnMouseOver = (rowIndex) => {
        this.setState({ hoveredRow: rowIndex });
    };

    handleOnMouseOut = (rowIndex) => {
        this.setState({ hoveredRow: null });
    };

    getSlotClassName = (columnIndex) => {
        return classNames({
            'board-slot': true,
            'board-slot_isActive': columnIndex === this.state.hoveredRow,
        });
    };

    render() {
        return (
            <ul className={`board board_${this.props.config.WIDTH}up`}>
                {this.props.discs.map((disc, index) => {
                    const isMatch = this.props.matches.includes(index);
                    const columnIndex = this.getColumnIndex(index);
                    return (
                        <li
                            key={`slot_${index}`}
                            onMouseOver={() => this.handleOnMouseOver(columnIndex)}
                            onMouseOut={() => this.handleOnMouseOut()}
                            className={this.getSlotClassName(columnIndex)}
                            data-column={columnIndex}
                        >
                            <Disc value={disc} isMatch={isMatch} onClick={() => this.props.onDiscClick(columnIndex)} />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Board;
