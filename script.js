// Functionality
// - Select question
// - Submit answer
// - Check answer
// - Replace square with image
// - Finish Puzzle 

let selectedSquare = '';
let squaresLeft = 9;
let hint = document.getElementById('hint');

function selectQuestion(square) {
    console.log('selected ' + square.id);
    let allSquares = document.querySelectorAll('.square');
    for (let elem of allSquares) {
        elem.style.border = '1px solid black'; // Reset border to 1px for all squares
    }
    hint.innerHTML = ''; 

    square.style.border = '3px solid black'; // Set the selected square's border to 3px
    selectedSquare = square.id;

    // Set focus to the input field when a square is selected
    document.querySelector('input[type="text"]').focus();
}

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', function() {
        selectQuestion(this);
    });
});

function checkAnswer(input) {
    input = input.toLowerCase();
    
    if (selectedSquare === '') {
        hint.innerHTML = 'Please select a square';
        return;
    } 

    const answers = {
        one: 'brunch',
        two: 'columbus',
        three: 'vikings',
        four: 'isabella',
        five: 'thai',
        six: 'iced almond cap',
        seven: 'i am',
        eight: 'so so so so so much',
        nine: 'forever'
    };

    const hints = {
        one: "Hint: it's a combination of two meals.",
        two: "Hint: east coast time zone.",
        three: "Hint: it's cold where they play.",
        four: "Hint: it rhymes with straciatella.",
        five: "Hint: it's an asian cuisine.",
        six: "Hint: cold alt milk espresso drink. use an abbreviation for the type of drink.",
        seven: "Hint: it's who you see when you look in the mirror.",
        eight: "Hint: 5 so's.",
        nine: "Hint: it's at least one more year."
    };

    if (input === answers[selectedSquare]) {
        hint.innerHTML = '';
        const image = document.createElement('img');
        const imageFileNames = {
            one: 'assets/brunch.jpeg',
            two: 'assets/columbus.jpeg',
            three: 'assets/vikings.jpeg',
            four: 'assets/stracciatella.jpeg',
            five: 'assets/thai.jpeg',
            six: 'assets/coffee.jpeg',
            seven: 'assets/bestfriend.jpeg',
            eight: 'assets/love.jpeg',
            nine: 'assets/forever.jpeg'
        };
        image.src = imageFileNames[selectedSquare];
        image.style.objectFit = 'cover';
        image.style.width = '100%';
        image.style.height = '100%';
        document.getElementById(selectedSquare).innerHTML = '';
        document.getElementById(selectedSquare).appendChild(image);
        document.getElementById(selectedSquare).style.border = 'none';
        document.getElementById(selectedSquare).style.paddingLeft = '0';
        document.getElementById(selectedSquare).style.paddingRight = '0';
        squaresLeft--;
        document.querySelector('input[type="text"]').value = ''; // Clear the input field
    } else {
        hint.innerHTML = hints[selectedSquare];
    }
    if (squaresLeft === 0) {
        document.querySelector('form').style.display = 'none';
        hint.innerHTML = 'Apparently very well. Good job! ❤️';
        hint.style.color = 'black';
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play again';
        playAgainButton.onclick = function() { window.location.reload(); };
        playAgainButton.style.fontSize = '1.5em'; // Match the size of the original form button
        playAgainButton.style.padding = '10px'; // Match the padding of the original form button
        playAgainButton.style.background = 'linear-gradient(45deg, #ff6ec4, #f75858)';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = '1px solid black';
        playAgainButton.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        playAgainButton.style.cursor = 'pointer';
        playAgainButton.style.width = 'auto'; // Prevent the button from taking up the full width
        playAgainButton.style.display = 'block'; // Ensure the button is a block element for centering
        playAgainButton.style.margin = '0 auto'; // Center the button
        document.body.appendChild(playAgainButton); // Append the button as a new flex item in the body
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    checkAnswer(document.querySelector('input').value);
});
