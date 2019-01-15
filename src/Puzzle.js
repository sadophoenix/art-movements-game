// This file is adapted from <Màxim Colls> @ github.com/mllocs

import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import "./Puzzle.css"


const winningMessages = [
    'Deposition (1602-1604 ή 1607). \n' +
    'Αυτό το έργο ζητήθηκε από τον Girolamo Vittrice πρός την εκκλησία της οικογένειας του, \n' +
    'που είναι ο ναός παναγίας της κοιλάδος που βρίσκεται στην\n' +
    'Ρώμη.H συγκεκριμένη εποχή για την ιστορία της τέχνης αποτελεί τις αρχές του Μπαρόκ (1600 - 1750).\n' +
    'Καλλιτέχνης: Michelangelo Merisi da Caravaggio (1571-1610).\n',
    'The Houses of Parliament, Sunset, (1903). Το έργο είναι απο μια σειρά ζωγραφιών από τον Monet για την απεικόνιση του παλατιού του Westminster.\n' +
    'Ο ιμπρεσιονισμός είναι ένα καλλιτεχνικό ρεύμα που αναπτύχθηκε στο δεύτερο μισό του 19ου αιώνα. \n' +
    'Πέρα από την ζωγραφική, επηρέασε τόσο τη λογοτεχνία όσο και τη μουσική. \n' +
    'Ο όρος ιμπρεσιονισμός πιθανόν προήλθε από το έργο του claude monet Impression, Sunrise.\n' +
    'Καλλιτέχνης: Oscar-Claude Monet (1840-1926).\n\n',
    'The Raft of the Medusa (1818-1819). Απεικονίζεται το ναυάγιο μιας Γαλλικής φρεγάτας ("μέδουσα") στις ακτές της Αφρικής το 1816.\n' +
    'To έργο αυτό θεωρείται σύμβολο για τον Γαλλικό ρομαντισμό. O ρομαντισμός γενικότερα ξεκίνησε περίπου το 1770.\n' +
    'Καλλιτέχνης: Théodore Géricault (1791–1824).\n\n',
    'Swans Reflecting Elephants (1937). Κύκνοι αντικατοπτρίζουν ελέφαντες. Τονίζεται η δυναμική σχέση πραγματικού και ψευδαισθητικού. \n' +
    'Υπάρχει μια ειρωνική στάση απέναντι σε αυτό που θεωρείται πραγματικό και την πράξη αναπαράστασης. Ο Σουρεαλισμός ερμηνεύεται ως πέρα από την πραγματικότητα.\n' +
    'Εξελίχθηκε σε ένα ευρύτερο καλλιτεχνικό και πολιτικό ρεύμα. (1920-1930).\n' +
    'Καλλιτέχνης: Salvador Dali (1904-1989).\n\n',
    'Ηλιοτρόπια (1888). Αποτελεί την δεύτερη σειρά έργων νεκρής φύσης του Vincent van Gogh σχετικά με ηλιοτρόπια.\n' +
    'Ο μεταϊμπρεσιονισμός αποτελεί καλλιτεχνικό ρεύμα που αναπτύχθηκε περί τα τέλη του 19ου αιώνα, αμέσως μετά το κίνημα του ιμπρεσιονισμού, \n' +
    'του οποίου αποτέλεσε κατά κάποιο τρόπο προέκταση. (1886-1905)\n' +
    'Καλλιτέχνης: Vincent van Gogh (1853-1890).\n\n',
    '"Οι σταχομαζώχτρες" (1857). Η προσπάθεια πιστής απόδοσης της πραγματικότητας, το ενδιαφέρον του καλλιτέχνη για τη ζωή των απλών καθημερινών ανθρώπων,\n' +
    ' για το αληθινό και όχι για το ωραίο αποτυπώνεται σε αυτό τον πίνακα του\n' +
    'Κατά την εποχή του ρεαλισμού ορισμένοι καλλιτέχνες άρχισαν να απορρίπτουν τον αισθηματισμό του Ρομαντισμού\n' +
    ' και επιδίωξαν να ξανα-απεικονίσουν τη ζωή με ρεαλιστικό τρόπο. (1850-1880)\n' +
    'Καλλιτέχνης: Jean-François Millet (1814-1875)\n\n',
    'Composition VIII (1923).Η συγκεκριμένη σύνθεση αποτελείται από στοιχεία όπως ο κύκλος, τα ημικύκλια, οι γωνίες, οι ευθείες και οι καμπύλες. \n' +
    'Παρατηρείται μια διανοητική ένταση.\n' +
    'Με τον όρο αφηρημένη τέχνη αναφερόμαστε σε ένα μοντέρνο κίνημα στις εικαστικές τέχνες\n' +
    'σύμφωνα με το οποίο αποκλείεται οποιαδήποτε αναφορά στην εξωτερική φυσική πραγματικότητα.\n' +
    'Καλλιτέχνης: Wassily Wassilyevich Kandinsky (1866-1944).\n\n',
    'Nighthawks (1942).  Ενα πορτραίτο των ανθρωπίνων σχέσεων της Αμερικής στην αρχή του περασμένου αιώνα, που αφορά την ανθρώπινη μοναξιά.\n' +
    'Εκφράζεται η μελαγχολία του αμερικανικού ονείρου με τρόπο οριστικό. O νεορεαλισμός βασίζεται στις ιδέες που υπήρχαν στον ρεαλισμό που διαμορφώθηκε\n' +
    'στα μέσα του 19ου αιώνα. \n' +
    'Καλλιτέχνης: Edward Hopper (1882-1967).\n\n',
    'Η κυρία με την Ερμίνα. (1488,1490). Συμβολίζεται η αξία της αγνότητας.Ο πίνακας, μαζί με το Πορτρέτο Μουσικού και την λεγόμενη Μπελ Φερρονιέρ του Μουσείου του Λούβρου, \n' +
    'ανανέωσε βαθύτατα το καλλιτεχνικό περιβάλλον του Μιλάνου και ανέβασε πιο ψηλά την ποιότητα της τοπικής παράδοσης των πορτρέτων. To συγκεκριμένο έργο φτιάχτηκε την εποχή \n' +
    'της Αναγέννησης. (αρχές 14ου - 17ου αιώνα)\n' +
    'Καλλιτέχνης: Leonardo da Vinci (1452-1519).\n' +
    '\n\n'
];

/**
 * Shuffles the passed array and returns a new one
 *
 * @param  {Array} a
 * @return {Array}
 */
function shuffle(a) {
    const b = a.slice();

    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }

    return b;
}

function Statistics(props) {
    return <div className={"statistics-div"}>
        <p>Total moves: {props.totalMoves}</p>
        <p>Greens: {props.greens}</p>
        <p>Reds: {props.reds}</p>
        <p>Yellows: {props.yellows}</p>
    </div>
}

class Puzzle extends React.Component {
    constructor(props) {
        super(props);

        const { level } = props;
        const cells = 3 * level * level;
        const statistics = { totalMoves: 0, reds: 0, yellows: 0, greens: 0, points: 100 };
        this.state = { positions: Array.from(Array(cells).keys()), statistics: statistics };
    }

    componentDidMount() {
        const positions = this.state.positions;
        const level = this.props.level;
        // Shuffle only the image cells
        const shuffled = shuffle(positions.slice(0, 2 * level * level));
        for (let i in shuffled) {
            positions[i] = shuffled[i];
        }
        this.setState({ positions: positions });
    }

    updateStatistics(statistics, swappedType) {
        statistics.totalMoves = statistics.totalMoves + 1;
        switch (swappedType) {
            case 'G':
                statistics.greens = statistics.greens + 1;
                break;
            case 'R':
                statistics.reds = statistics.reds + 1;
                break;
            case 'Y':
                statistics.yellows = statistics.yellows + 1;
                break;
        }
    }

    onSwap(sourcePosition, dropPosition) {
        const positions = this.state.positions.slice();
        const statistics = this.state.statistics;
        for (let i in positions) {
            if (positions[i] === sourcePosition) {
                positions[i] = dropPosition;
            } else if (positions[i] === dropPosition) {
                positions[i] = sourcePosition;
                this.updateStatistics(statistics, this.typeOfSwap(parseInt(i), sourcePosition));
            }
        }
        this.setState({ positions: positions, statistics: statistics });
    }

    typeOfSwap(index, sourcePosition) {
        let { level } = this.props;
        if (index === (sourcePosition+18)) {
            // Change the border to green
            return 'G';
            // If we are placing a piece from the wrong image in the result section, make it red
        } else if (index >= 2 * level * level && sourcePosition < 2 * level * level && sourcePosition >= level * level) {
            return 'R';
            // If we are placing a piece from the correct image but in wrong place in the result section, make it yellow
        } else if (index >= 2 * level * level && sourcePosition < level * level) {
            return 'Y';
        }
        return 'B';
    }

    definePieceBorders(index, position, finished) {
        // If finished the puzzle we remove all borders
        if (finished) {
            return '';
        }
        const swappedType = this.typeOfSwap(index, position);
        switch (swappedType) {
            case 'G':
                return '3px ridge green';
            case 'R':
                return '3px dotted red';
            case 'Y':
                return '3px dotted yellow';
            case 'B':
                return '3px solid black';
        }
    }

    renderSquares(finished) {
        const { image, image2, size, level } = this.props;
        const positions = this.state.positions.slice();

        let index = -1;
        const squares = positions.map((i) => {
            index++;
            // If we have finished, we want to show only the result image
            if (finished && index < 2 * level * level)
            {
                return;
            }
            let border = this.definePieceBorders(index, i, finished);

            // Check if this should be a blank cell
            if (i >= 2 * level * level) {
                return (
                    <Cell
                        key={i}
                        size={size}
                        border={border}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            }
            // Use second image
            else if (i >= level * level) {
                return (
                    <Cell
                        key={i}
                        size={size}
                        border={border}
                        image={image2}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            // Use first image
            } else {
                return (
                    <Cell
                        key={i}
                        size={size}
                        image={image}
                        border={border}
                        level={level}
                        position={i}
                        onSwap={this.onSwap.bind(this)}
                    />
                );
            }
        })
        return squares;
    }

    checkIfPuzzleComplete() {
        const level = this.props.level;
        const result = this.state.positions.slice(2 * level * level);
        for (let i in result) {
            if (result[i] != i) {
                return false;
            }
        }
        return true;
    }

    render() {
        const { level, size } = this.props;
        const finished = this.checkIfPuzzleComplete();
        if (finished) {
            this.props.onDone(winningMessages[this.props.goalImageId]);
        }
        const squares = this.renderSquares(finished);
        const statistics = this.state.statistics;
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: "1%",
                    width: `${3*size+120}px`,
                    height: `${size+350}px`
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: "1%",
                        width: `${2*size+40}px`,
                        height: `${size}px`
                    }}>
                    {squares.slice(0, 2 * level * level)}
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginLeft: '10px',
                    padding: "1%",
                    width: `${size+15}px`,
                    height: `${size}px`
                }}>
                    {squares.slice(2 * level * level)}
                </div>
                <div>
                    {Statistics(statistics)}
                </div>
            </div>
        );
    }
};

Puzzle.propTypes = {
    image: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    goalImageId: PropTypes.number.isRequired,
    size: PropTypes.number,
    level: PropTypes.number,
    onDone: PropTypes.func,
};

Puzzle.defaultProps = {
    size: 300,
    level: 3,
    onDone: (winningMessage) => { alert("συγχαρητήρια! " + winningMessage); },
};

export default DragDropContext(HTML5Backend)(Puzzle);
