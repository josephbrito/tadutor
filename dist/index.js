"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const textareaFrom = document.querySelector("#textarea_from");
const textareaTo = document.querySelector("#textarea_to");
const translate = document.querySelector("#btn_translate");
const selects = document.querySelectorAll("select");
const countries = {
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
        }
        else if (tag.className === "select_to" && country == "en-GB") {
            selected = "selected";
        }
        const optionTag = `<option value="${country}" ${selected}>${countries[country]}</option>`;
        tag.insertAdjacentHTML("beforeend", optionTag);
    }
});
translate === null || translate === void 0 ? void 0 : translate.addEventListener("click", () => {
    if (textareaFrom.value) {
        getTranslate();
    }
    else {
        alert("insira valores antes de continuar");
    }
});
function getTranslate() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`);
        const data = yield res.json();
        const { translatedText } = data.responseData;
        textareaTo.value = translatedText;
    });
}
