# code lỏ
import re
from pyvi import ViTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx
import torch
from transformers import BertTokenizer, BertLMHeadModel
import os
os.environ['PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION'] = 'python'

def preprocess_text(text):
    # Tiền xử lý văn bản: chuyển văn bản về dạng chữ thường và tách từ
    text = text.lower()
    text = ViTokenizer.tokenize(text)
    text = re.sub(r'[^\w\s]', '', text)
    return text

def sentence_similarity(sent1, sent2, vectorizer):
    # Tính toán độ tương đồng ngữ nghĩa giữa hai câu sử dụng cosine similarity
    tfidf_matrix = vectorizer.transform([sent1, sent2])
    similarity_matrix = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
    similarity_score = similarity_matrix[0][0]
    return similarity_score

def build_similarity_matrix(sentences, vectorizer):
    # Xây dựng ma trận tương đồng
    similarity_matrix = nx.Graph()
    similarity_matrix.add_nodes_from(range(len(sentences)))
    for i in range(len(sentences)):
        for j in range(i+1, len(sentences)):
            similarity = sentence_similarity(sentences[i], sentences[j], vectorizer)
            similarity_matrix.add_edge(i, j, weight=similarity)
    return similarity_matrix

def textrank(sentences, similarity_matrix, threshold=0.1, damping_factor=0.85, max_iterations=100):
    # Áp dụng thuật toán TextRank để xác định mức độ quan trọng của các câu
    scores = nx.pagerank(similarity_matrix, alpha=damping_factor, max_iter=max_iterations)

    # Chọn ra các câu quan trọng nhất
    ranked_sentences = [(scores[i], sentence) for i, sentence in enumerate(sentences) if scores[i] > threshold]
    ranked_sentences.sort(reverse=True)

    return ranked_sentences

def summarize(text, max_length=100):
    # Tạo tokenizer và mô hình BERT pre-trained
    tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')
    model = BertLMHeadModel.from_pretrained('bert-base-multilingual-cased')

    # Tiền xử lý văn bản và mã hoá thành mã số
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors='pt')
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']

    # Sử dụng mô hình BERT để tạo tóm tắt
    with torch.no_grad():
        outputs = model.generate(input_ids, attention_mask=attention_mask, max_length=max_length, early_stopping=True, forced_bos_token_id=tokenizer.bos_token_id)
    
    # Giải mã tóm tắt thành văn bản
    summarized_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summarized_text


text = "Việt Nam, tên chính thức là Cộng hòa Xã hội Chủ nghĩa Việt Nam, là một quốc gia nằm ở phía đông bán đảo Đông Dương thuộc khu vực Đông Nam Á. Việt Nam giáp biển Đông và biển Hoa Đông ở phía đông, giáp Campuchia và Lào ở phía tây, giáp Trung Quốc ở phía bắc, giáp Thái Lan ở phía tây nam. Thủ đô của Việt Nam là Hà Nội, và thành phố lớn nhất là Thành phố Hồ Chí Minh ( trước đây được gọi là Sài Gòn )."
summary = summarize(text, max_length=1)
print('text')
print(text)
print('summary')
print(summary)

