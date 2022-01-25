// TODO: debounce

async function main() {
    const result = await fetch('five_letter_words.txt');
    const five_letter_words_content = await result.text();
    const words = five_letter_words_content.split('\n');

    const possible_words_h2 = document.getElementById("possible_words_h2");
    const possible_words_ul = document.getElementById("possible_words_ul");
    const include_input = document.getElementById("include");
    const exclude_input = document.getElementById("exclude");

    const positional_match_inputs = [
        document.getElementById("match_1st"),
        document.getElementById("match_2nd"),
        document.getElementById("match_3rd"),
        document.getElementById("match_4th"),
        document.getElementById("match_5th")
    ];

    const update_possible_words = () => {
        const include_chars = include_input.value.toLowerCase().split('');
        const exclude_chars = exclude_input.value.toLowerCase().split('');

        const matching_words = words.filter((word) => {
            return include_chars.every(char => word.includes(char));
        }).filter((word) => {
            return exclude_chars.every(char => !word.includes(char));
        }).filter((word) => {
            return positional_match_inputs.every((input, index) => {
                return input.value === '' ? true : word[index] === input.value.toLowerCase();
            });
        });

        possible_words_ul.innerHTML = '';
        possible_words_h2.innerHTML = `Possible words (${matching_words.length})`
        matching_words.forEach((word) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(word));
            possible_words_ul.appendChild(li);
        });
    };

    [include_input,
     exclude_input,
     positional_match_inputs[0],
     positional_match_inputs[1],
     positional_match_inputs[2],
     positional_match_inputs[3],
     positional_match_inputs[4]].forEach(elem => elem.onkeyup = update_possible_words);

    update_possible_words();
}

(async() => {
    await main();
})();