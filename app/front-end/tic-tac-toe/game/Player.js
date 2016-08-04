export default class Player {
    constructor(props) {
        this.name = props.name;
        this.figure = props.figure;
        this.turn = props.turn;
        this.winningTilesArray = [];
    }
}
