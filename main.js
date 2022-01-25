// TODO: debounce

async function main() {
    const result = await fetch('five_letter_words.txt');
    const five_letter_words_content = await result.text();
    const words = five_letter_words_content.split('\n');

    const possible_words_ul = document.getElementById("possible_words");
    const include_input = document.getElementById("include");
    const exclude_input = document.getElementById("exclude");

    const update_possible_words = () => {
        const include_chars = include_input.value.toLowerCase().split('');
        const exclude_chars = exclude_input.value.toLowerCase().split('');

        const matching_words = words.filter((word) => {
            return include_chars.every(char => word.includes(char));
        }).filter((word) => {
            return exclude_chars.every(char => !word.includes(char));
        });

        possible_words_ul.innerHTML = '';

        matching_words.forEach((word) => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(word));
            possible_words_ul.appendChild(li);
        });
    };

    include_input.onkeyup = update_possible_words;
    exclude_input.onkeyup = update_possible_words;

    update_possible_words();
}

(async() => {
    await main();
})();