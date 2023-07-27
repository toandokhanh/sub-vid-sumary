import gpt_2_simple as gpt2
from sumy.utils import get_stop_words
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

LANGUAGE = "english"
SENTENCES_COUNT = 10

def generate_gpt2_summary(text):
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess)
    generated_text = gpt2.generate(sess, prefix=text, length=100, temperature=0.7, return_as_list=True)[0]
    return generated_text

def generate_initial_summary(text):
    parser = PlaintextParser.from_string(text, Tokenizer(LANGUAGE))
    summarizer = LsaSummarizer()
    summarizer.stop_words = get_stop_words(LANGUAGE)

    summary = []
    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        summary.append(str(sentence))

    return " ".join(summary)

def combine_summaries(gpt2_summary, initial_summary):
    combined_summary = initial_summary + " " + gpt2_summary
    return combined_summary

def text_summarization_pipeline(text):
    initial_summary = generate_initial_summary(text)
    gpt2_summary = generate_gpt2_summary(text)
    combined_summary = combine_summaries(gpt2_summary, initial_summary)
    return combined_summary

text = "Bài báo này đại diện cho nghiên cứu về tạo câu hỏi tự động thông qua NLP với mô hình thống kê và mạng lưới thần kinh mới. Bài báo này cũng thảo luận về việc xem xét lại công việc nghiên cứu được thực hiện cho đến nay trong lĩnh vực này. Question Generation (QG) nhằm mục đích tạo ra các câu hỏi tự nhiên từ một câu hoặc một đoạn văn cho trước. NLP (Xử lý ngôn ngữ tự nhiên) là một lĩnh vực nghiên cứu và ứng dụng khám phá cách máy tính có thể được sử dụng để hiểu và thao tác văn bản hoặc lời nói ngôn ngữ tự nhiên để làm những việc hữu ích. Mục đích của chúng tôi là tạo ra kỹ thuật có thể tạo ra nhiều câu hỏi logic khác nhau từ kiểu nhập văn bản đã cho. Hiện tại, chỉ có con người mới có khả năng thực hiện điều này với độ chính xác cao hơn."
summary = text_summarization_pipeline(text)
print(summary)
