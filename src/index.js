import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';


/////////////////////////////////////// Simples fonctions /////////////////////////////////////////////
function Square(props) {  //Définition d'un bouton
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [                        //Lignes gagnantes
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {  //Vérification des lignes
      return squares[a];
    }
  }
  return null;
}

///////////////////////////////////////////// Components //////////////////////////////////////////////
class Board extends React.Component {
  constructor(props) {  //De base
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      lastScoreX: 0, //Initialisation score
      lastScoreO: 0
    };
  }
  handleClick(i) {   //Au clic
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) { //Evite de pouvoir rejouer la case
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,    //Changement X ou O
    });
  }

  handleClickReplay(scoreX, scoreO){  //Réinitialisation au click bouton rejouer. Paramètre pour la sauvegarde du score
    this.setState({
      squares : Array(9).fill(null),
      xIsNext: true,
      lastScoreX : scoreX,                 
      lastScoreO: scoreO
    }); 
  }

  renderSquare(i) {  //Rendu de la case (x,o,rien)
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {    //Rendu du tableau de jeu
    const winner = calculateWinner(this.state.squares);
    let scoreX = this.state.lastScoreX;
    let scoreO = this.state.lastScoreO;
    let status;
    if (winner) {
      status = winner + ' a gagné!';
      if (winner === 'X') {
        scoreX ++;
      }else{
        scoreO ++;
      }
    } else {
      status = 'Prochain joueur: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <section className="game">
        <div className=" game-board">
          <div className="col-12">
            <div className="status text-center">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
            <div className='text-center'>
              <button type="button" className="btn btn-primary" onClick={()=>this.handleClickReplay(scoreX, scoreO)}>Rejouer</button>
            </div>
          </div>
          <div className="score row">
              <div className="col-12">
                <h2 className='text-center'>Score</h2>
                <div className='row'>
                  <div className='col-6'>
                    <h4 className='text-center'>Joueur X</h4>
                    {scoreX}
                  </div>
                  <div className='col-6'>
                    <h4 className='text-center'>Joueur O</h4>
                    {scoreO}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById('root'));  //Passage au html


