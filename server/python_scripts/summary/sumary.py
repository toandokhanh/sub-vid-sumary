# -*- coding: utf-8 -*-

from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from googletrans import Translator
import os

LANGUAGE = "english"
SENTENCES_COUNT = 10


def translate_text(text, source_lang, target_lang):
    translator = Translator()
    translation = translator.translate(text, src=source_lang, dest=target_lang)
    return translation.text


def summarize_text(text, sentences_count):
    parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)
    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    summary = []
    for sentence in summarizer(parser.document, sentences_count):
        summary.append(str(sentence))

    return " ".join(summary)


def process_text_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        text = file.read()

    lang = "en"
    if lang != LANGUAGE:
        translated_text = translate_text(text, lang, LANGUAGE)
        summary = summarize_text(translated_text, SENTENCES_COUNT)
        translated_summary = translate_text(summary, LANGUAGE, lang)

        file_name = os.path.basename(file_path)
        file_name_no_ext = os.path.splitext(file_name)[0]
        result_file_path_en = os.path.join("result", file_name_no_ext + "_en.txt")
        with open(result_file_path_en, "w", encoding="utf-8") as result_file_en:
            result_file_en.write(summary)

        result_file_path = os.path.join("result", file_name_no_ext + "_" + lang + ".txt")
        with open(result_file_path, "w", encoding="utf-8") as result_file:
            result_file.write(translated_summary)


if __name__ == "__main__":
    file_path = "test.txt"
    process_text_file(file_path)
    print(process_text_file(file_path)  )


# code lỏ

# # -*- coding: utf-8 -*-

# from __future__ import absolute_import
# from __future__ import division, print_function, unicode_literals

# from sumy.parsers.html import HtmlParser
# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.summarizers.lsa import LsaSummarizer as Summarizer
# from sumy.nlp.stemmers import Stemmer
# from sumy.utils import get_stop_words


# LANGUAGE = "english"
# SENTENCES_COUNT = 10


# if __name__ == "__main__":
#     # url = "https://en.wikipedia.org/wiki/Automatic_summarization"
#     # parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
#     # or for plain text files
#     parser = PlaintextParser.from_file("data/en_sub.txt", Tokenizer(LANGUAGE))
#     # parser = PlaintextParser.from_string("Check this out.", Tokenizer(LANGUAGE))
#     stemmer = Stemmer(LANGUAGE)

#     summarizer = Summarizer(stemmer)
#     summarizer.stop_words = get_stop_words(LANGUAGE)

#     for sentence in summarizer(parser.document, SENTENCES_COUNT):
#         print('sentence')
#         print(sentence)