import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class tictactoe extends Component {
  constructor() {
    super();
    this.checkWinner = this.checkWinner.bind(this);
    this.state = {
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      currentSymbol: 'x',
      winner: [false, false],
    }
  }
  checkWinner() {
    const board = this.state.board;
    board.map((line, idx) => {
      if (line[0] === line[1] && line[1] === line[2]) {
        if (line[0] === 'x') {
          this.setState({winner: [true, false]});
        }
        else if(line[0] === 'o') {
          this.setState({winner: [false, true]});
        }
      }
      for (let i = 0; i <= 2; ++i) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          if (board[0][i] === 'x'){
            this.setState({winner: [true, false]});
          }
          else if (board[0][i] === 'o') {
            this.setState({winner: [false, true]});
          }
        }
      }
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === 'x') {
          this.setState({winner: [true, false]});
        }
        else if (board[0][0] === 'o') {
          this.setState({winner: [false, true]});
        }
      }
      if (board[0][2] === board[1][1] && board [1][1] === board[2][0]) {
        if (board[1][1] === 'x') {
          this.setState({winner: [true, false]});
        }
        else if (board[1][1] === 'o') {
          this.setState({winner: [false, true]});
        }
      }
    })
  }
  render() {
    const renderLines = this.state.board.map((line, idx) => {
      const renderCell = line.map((cell, cellidx) => {
        return (
          <TouchableHighlight
            key={cellidx}
            style={styles.cells}
            onPress={() => {
              if (this.state.board[idx][cellidx] === '') {
              let newBoard = this.state.board;
              let symbol = this.state.currentSymbol;
              newBoard[idx][cellidx] = symbol;
              if (symbol === 'x') {
                symbol = 'o';
              }
              else {
                symbol = 'x';
              }
              this.setState({
                board: newBoard,
                currentSymbol: symbol
              });
              this.checkWinner();
            }}}
            >
            <Text style={styles.boxText}>
              {cell}
            </Text>
          </TouchableHighlight>
        )
      });
      return (
        <View key={idx} style={styles.lines}>
          {renderCell}
        </View>
      );
      })
    const renderWinner = this.state.winner.map((isWinner, idx) => {
      if (isWinner) {
        return (
          <Text key={idx}>Player {idx + 1} wins!</Text>
        )
      }
    })

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {renderLines}
        </View>
        <View style={styles.winner}>
          {renderWinner}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flex: 1,
  },
  board: {
    flex: 8,
    flexDirection: 'row',
  },
  lines: {
    flex: 1,
    flexDirection: 'column',
  },
  cells: {
    flex: 1,
    borderWidth: 2,
  },
  boxText: {
    fontSize: 100,
    textAlign: 'center',
  },
  winner: {
    flex: 1,
  }
});

AppRegistry.registerComponent('tictactoe', () => tictactoe);
