const textareaFrom = document.querySelector(
  "#textarea_from"
) as HTMLTextAreaElement;
const textareaTo = document.querySelector(
  "#textarea_to"
) as HTMLTextAreaElement;
const translate = document.querySelector("#btn_translate");
const selects = document.querySelectorAll("select");

interface ICountry {
  [key: string]: string;
}

interface IApi {
  responseData: {
    translatedText: string;
  };
}

const countries: ICountry = {
  "en-GB": "Inglês",
  "es-ES": "Espanhol",
  "it-IT": "Italiano",
  "ja-JP": "Japonês",
  "pt-BR": "Português",
};

selects.forEach((tag) => {
  for (let country in countries) {
    let selected = "";
    if (tag.className === "select_from" && country == "pt-BR") {
      selected = "selected";
    } else if (tag.className === "select_to" && country == "en-GB") {
      selected = "selected";
    }
    const optionTag = `<option value="${country}" ${selected}>${countries[country]}</option>`;

    tag.insertAdjacentHTML("beforeend", optionTag);
  }
});

translate?.addEventListener("click", () => {
  if (textareaFrom.value) {
    getTranslate();
  } else {
    alert("insira valores antes de continuar");
  }
});

async function getTranslate() {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
  );
  const data: IApi = await res.json();

  const { translatedText } = data.responseData;

  textareaTo.value = translatedText;
}
