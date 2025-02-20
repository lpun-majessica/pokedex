const base_link = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const typeContainer = document.getElementById("type-container");
const imageContainer = document.getElementById("image-container");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const statsTable = document.getElementById("base-stats");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const experience = document.getElementById("experience");

let currentID;

const searchPokemon = async (userInput) => {
	searchInput.value = "";
	const pokemonNameOrId = String(userInput).toLowerCase();

	try {
		const data = await fetch(`${base_link}/${pokemonNameOrId}`);
		const pokemonInfo = await data.json();
		currentID = pokemonInfo.id;

		updateUI(pokemonInfo);
	} catch (err) {
		currentID = null;
		console.log(err);
		alert("Pokémon not found");
		clearUI();
	}
};

const updateUI = (pokemonInfo) => {
	typeContainer.textContent = "";

	pokemonName.textContent = pokemonInfo.name.toUpperCase();
	pokemonId.textContent = `No. ${pokemonInfo.id}`;

	handleImageAvailability(pokemonInfo);

	pokemonInfo.types.forEach(({ _, type }) => {
		const typeName = type.name;

		const typeTag = document.createElement("p");
		const typeText = document.createTextNode(typeName.toUpperCase());

		typeTag.classList.add("type", typeName);
		typeTag.appendChild(typeText);
		typeContainer.appendChild(typeTag);
	});

	weight.textContent = `Weight: ${pokemonInfo.weight / 10} kg`;
	height.textContent = `Height: ${pokemonInfo.height / 10} m`;

	experience.textContent = `Base Experience: ${pokemonInfo.base_experience}`;

	statsTable.classList.remove("hidden");
	hp.textContent = pokemonInfo.stats[0].base_stat;
	attack.textContent = pokemonInfo.stats[1].base_stat;
	defense.textContent = pokemonInfo.stats[2].base_stat;
	specialAttack.textContent = pokemonInfo.stats[3].base_stat;
	specialDefense.textContent = pokemonInfo.stats[4].base_stat;
	speed.textContent = pokemonInfo.stats[5].base_stat;
};

const clearUI = () => {
	typeContainer.textContent = "";

	pokemonName.textContent = "";
	pokemonId.textContent = "";

	imageContainer.textContent = "";
	typeContainer.textContent = "";

	weight.textContent = "";
	height.textContent = "";

	experience.textContent = "";

	statsTable.classList.add("hidden");
	hp.textContent = "";
	attack.textContent = "";
	defense.textContent = "";
	specialAttack.textContent = "";
	specialDefense.textContent = "";
	speed.textContent = "";
};

const handleImageAvailability = (pokemonInfo) => {
	imageContainer.textContent = "";
	const sprites = [
		"front_default",
		"front_shiny",
		"back_default",
		"back_shiny",
	];

	sprites.forEach((sprite) => {
		imageContainer.innerHTML += pokemonInfo.sprites.hasOwnProperty(sprite)
			? `<img id="${sprite.replace("_", "-")}" class="sprite" src="${
					pokemonInfo.sprites[sprite]
			  }" alt="${pokemonInfo.name} front default sprite" />`
			: `<p>Sprite: ${sprite.replace("_", " ")} not available</p>`;
	});
};

searchBtn.addEventListener("click", () => {
	searchPokemon(searchInput.value);
});
searchInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		searchPokemon(searchInput.value);
	}
});
previousBtn.addEventListener("click", () => {
	console.log(currentID ? currentID : 1);
	searchPokemon(currentID ? currentID - 1 : 1);
});
nextBtn.addEventListener("click", () => {
	console.log(currentID ? currentID : 1);
	searchPokemon(currentID ? currentID + 1 : 1);
});
